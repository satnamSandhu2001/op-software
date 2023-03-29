const express = require('express');
const {
  getAllSubscriptions,
  updateSubscription,
  getSubscriptionDetails,
} = require('../controlers/subscriptionControler');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router
  .route('/subscription/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateSubscription)
  .get(getSubscriptionDetails);

router.route('/subscriptions').get(getAllSubscriptions);

module.exports = router;
