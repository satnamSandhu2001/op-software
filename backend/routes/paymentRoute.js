const express = require('express');
const router = express.Router();
const {
  processPayment,
  paymentSuccess,
  sendRazorpayKeyID,
} = require('../controlers/paymentControllers');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);

router.route('/payment/success').post(isAuthenticatedUser, paymentSuccess);
router.route('/razorpayapikey').get(isAuthenticatedUser, sendRazorpayKeyID);

module.exports = router;
