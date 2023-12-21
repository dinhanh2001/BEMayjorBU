const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const multer = require('multer');
const upload = multer().single('avatar');
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'role', 'org_ids']);
  console.log('req', req.user.id);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, Object.assign({ user: req.user }, options));
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getCurrentUser = catchAsync(async (req, res) => {
  console.log(req.user);
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  let updateBody = req.body;
  if (req.file) {
    updateBody = {
      ...req.body,
      avatar: {
        name: `${req.params.userId}_${req.file.originalname}`,
      },
    };
  }
  // console.log('updateBody', updateBody, req.body);
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      console.log('bug 1');
      // return res.send(req.fileValidationError);
    } else if (err instanceof multer.MulterError) {
      console.log('bug 3');
      // return res.send(err);
    }
  });
  const user = await userService.updateUserById(req.params.userId, updateBody);
  res.send({ user });
});

const resetPassword = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, { passwword: 'password123' });
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  resetPassword,
};
