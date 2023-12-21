const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { explainService } = require('../services');

const createExplain = catchAsync(async (req, res) => {
  const Explain = await explainService.createExplain(req.body);
  res.status(httpStatus.CREATED).send(Explain);
});

const getExplains = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['org_id', 'user_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await explainService.queryExplains(filter, options);
  res.send(result);
});

const searchExplains = catchAsync(async (req, res) => {
  console.log(req);
  const filter = pick(req.query, ['user_name', 'reason_name']);
  const options = pick(req.query, ['limit', 'page']);
  const result = await explainService.searchExplains(filter, options);
  res.send(result);
});

const getExplain = catchAsync(async (req, res) => {
  const Explain = await explainService.getExplainById(req.params.explainId);
  if (!Explain) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Explain not found');
  }
  res.send(Explain);
});

const updateExplain = catchAsync(async (req, res) => {
  // console.log('controller', res);
  const Explain = await explainService.updateExplainById(req.params.explainId, req.body);
  res.send(Explain);
});

const deleteExplain = catchAsync(async (req, res) => {
  await explainService.deleteExplainById(req.params.explainId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createExplain,
  getExplains,
  getExplain,
  updateExplain,
  deleteExplain,
  searchExplains,
};
