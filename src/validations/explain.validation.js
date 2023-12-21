const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createExplain = {
  body: Joi.object().keys({
    org_id: Joi.string().required(), //
    reason_name: Joi.string().required(),
    date_explain: Joi.date().required(), //
    user_id: Joi.string().required(), //
    user_name: Joi.string().required(), //
    id_place: Joi.string().required(), //
    place_name: Joi.string().required(), //
    status: Joi.string().required().valid('in', 'out'),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    decription: Joi.string(), //
  }),
};

const getExplains = {
  query: Joi.object().keys({
    org_id: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
    user_id: Joi.string(),
  }),
};

const searchExplains = {
  query: Joi.object().keys({
    user_name: Joi.string().allow('', null),
    reason_name: Joi.string().allow('', null),
    page: Joi.number(),
    limit: Joi.number(),
  }),
};
const getExplain = {
  params: Joi.object().keys({
    explainId: Joi.string().custom(objectId),
  }),
};

const updateExplain = {
  params: Joi.object().keys({
    explainId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    active: Joi.bool(),
    approval_name: Joi.string(),
  }),
};

const deleteExplain = {
  params: Joi.object().keys({
    explainId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createExplain,
  getExplains,
  getExplain,
  updateExplain,
  deleteExplain,
  searchExplains,
};
