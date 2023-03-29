const tryCatchError = require('../middleware/tryCatchError');
const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.processPayment = tryCatchError(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: crypto.randomBytes(10).toString('hex'),
  };
  const order = await instance.orders.create(options);

  if (!order) return res.status(500).send('Some error occured');

  res.json(order);
});

exports.paymentSuccess = tryCatchError(async (req, res, next) => {
  // getting the details back from our font-end
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  // Creating our own digest
  // The format should be like this:
  // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, RAZORPAY_SECRET);
  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);

  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

  const digest = shasum.digest('hex');

  // comaparing our digest with the actual signature
  if (digest !== razorpaySignature)
    return res
      .status(400)
      .json({ msg: 'Transaction failed! Please try again' });

  // THE PAYMENT IS LEGIT & VERIFIED

  res.json({
    success: true,
    msg: 'success',
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
  });
});

exports.sendRazorpayKeyID = tryCatchError(async (req, res, next) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});
