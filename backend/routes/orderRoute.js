const express = require('express');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  userOrders,
} = require('../controlers/orderControler');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
// Get single Order
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
//get logged in user my Orders
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// Get all orders --Admin
router
  .route('/admin/user-orders/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), userOrders);
router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAllOrders);

// Update order status --Admin
router.route('/admin/order/:id').delete(isAuthenticatedUser, deleteOrder);

module.exports = router;
