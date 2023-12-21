const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const explainValidation = require('../../validations/explain.validation');
const explainController = require('../../controllers/explain.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createExplain'), validate(explainValidation.createExplain), explainController.createExplain)
  .get(auth('approvalExplain'), validate(explainValidation.getExplains), explainController.getExplains);
router
  .route('/search')
  .get(auth('approvalExplain'), validate(explainValidation.searchExplains), explainController.searchExplains);

router
  .route('/:explainId')
  .get(auth('approvalExplain'), validate(explainValidation.getExplain), explainController.getExplain)
  .patch(auth('approvalExplain'), validate(explainValidation.updateExplain), explainController.updateExplain)
  .delete(auth('approvalExplain'), validate(explainValidation.deleteExplain), explainController.deleteExplain);

module.exports = router;
