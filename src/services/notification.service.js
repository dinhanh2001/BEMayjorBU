const httpStatus = require('http-status');
const { Notification } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a division
 * @param {Object}
 * @returns {Promise<Division>}
 */
const createNotification = async (NotificationBody) => {
  console.log(NotificationBody);
  const notification = await Notification.create(NotificationBody);
  return notification;
};

const queryNotifications = async (filter, options) => {
  // const test = {
  //   $and: [{ user_id: { $regex: filter['user_id'] } }, { status: { $regex: true } }],
  // };
  console.log(filter, options);
  const notifications = await Notification.find({
    user_id: filter.user_id,
    // status: filter.status,
  })
    .skip(1)
    .limit(Number(options?.limit))
    .sort({ create_date: -1 })
    .populate('user_id')
    .populate('targetId');
  return notifications;
};
/**
 * Get Explain by id
 * @param {ObjectId} id
 * @returns {Promise<Explain>}
 */
const getNotificationById = async (id) => {
  return Notification.findById(id);
};

const updateNotificationById = async (NotificationId, updateBody) => {
  const notification = await getNotificationById(NotificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  Object.assign(notification, updateBody);
  await notification.save();
  return notification;
};
/**
 * Delete Explain by id
 * @param {ObjectId} NotificationId
 * @returns {Promise<Explain>}
 */
const deleteNotificationById = async (NotificationId) => {
  const notification = await getNotificationById(NotificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tim thấy id thong bao');
  }
  await notification.remove();
  return notification;
};

module.exports = {
  createNotification,
  getNotificationById,
  deleteNotificationById,
  queryNotifications,
  updateNotificationById,
};
