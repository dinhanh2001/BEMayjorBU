const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const notificationValidation = require('../../validations/notification.vadidation');
const notificationController = require('../../controllers/notification.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(notificationValidation.createNotification), notificationController.createNotification)
  .get(validate(notificationValidation.getNotifications), notificationController.queryNotifications);

router
  .route('/:notificationId')
  .get(validate(notificationValidation.getNotification), notificationController.getNotification)
  .patch(validate(notificationValidation.updateNotification), notificationController.updateNotification)
  .delete(validate(notificationValidation.deleteNotification), notificationController.deleteNotification);

module.exports = router;
