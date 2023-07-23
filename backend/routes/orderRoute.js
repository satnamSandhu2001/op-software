const express = require('express');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  userOrders,
  getOldSQLData,
} = require('../controlers/orderControler');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
// Get single Order
router
  .route('/admin/order/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getSingleOrder);
//get logged in user my Orders
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// Get all orders --Admin
router
  .route('/admin/user-orders/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), userOrders);
router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAllOrders);

// Delete order --Admin
router.route('/admin/order/:id').delete(isAuthenticatedUser, deleteOrder);

// get old sql data before created website
router
  .route('/admin/orders/old')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getOldSQLData);

module.exports = router;
