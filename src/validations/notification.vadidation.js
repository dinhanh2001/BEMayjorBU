const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNotification = {
  body: Joi.object().keys({
    create_date: Joi.number().required(), //
    user_id: Joi.string().required().custom(objectId), //
    create_name: Joi.string().required(), //
    content: Joi.string().required(),
    targetId: Joi.string().required(),
  }),
};
const getNotifications = {
  params: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    page: Joi.number(),
    limit: Joi.number(),
    status: Joi.bool(),
  }),
};
const getNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
};

const updateNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: true,
  }),
};

const deleteNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNotification,
  getNotification,
  deleteNotification,
  getNotifications,
  updateNotification,
};
