const express = require('express');
const { getStats } = require('../controlers/reportsControler');
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');

router
  .route('/stats')
  .post(isAuthenticatedUser, authorizedRoles('admin'), getStats);

module.exports = router;
