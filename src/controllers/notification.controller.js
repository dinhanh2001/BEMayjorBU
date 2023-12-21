const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');

const createNotification = catchAsync(async (req, res) => {
  console.log('body', req.body);
  await notificationService.createNotification(req.body);
  res.status(httpStatus.CREATED).send({ status: 'create success' });
});

const queryNotifications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user_id', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await notificationService.queryNotifications(filter, options);
  if (!result) {
    throw new Error('No found notifications with conditional');
  }
  res.send(result);
});

const getNotification = catchAsync(async (req, res) => {
  const Notification = await notificationService.getNotificationById(req.params.notificationId);
  if (!Notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found11');
  }
  res.send(Notification);
});

const updateNotification = catchAsync(async (req, res) => {
  const Notification = await notificationService.updateNotificationById(req.params.notificationId, req.body);
  res.send(Notification);
});

const deleteNotification = catchAsync(async (req, res) => {
  await notificationService.deleteNotificationById(req.params.notificationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNotification,
  getNotification,
  deleteNotification,
  queryNotifications,
  updateNotification,
};
