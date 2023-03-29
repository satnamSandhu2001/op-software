const Order = require('../models/orderModel');
const Subscription = require('../models/subscriptionModel');
const tryCatchError = require('../middleware/tryCatchError');
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../utils/sendEmail');
var newOrderEmail = path.join(__dirname, '../utils/newOrderEmail.html');

// Create new Order
exports.newOrder = tryCatchError(async (req, res, next) => {
  const { orderItem, paymentInfo } = req.body;

  const subscription = await Subscription.aggregate([
    { $unwind: '$item' },
    { $match: { 'item._id': new mongoose.Types.ObjectId(orderItem._id) } },
  ]);
  if (!subscription) {
    return next(
      new ErrorHandler('Subscription not found or has been deleted', 404)
    );
  }

  delete subscription[0].filename;
  const orderExpDate = new Date(Date.now() + subscription[0].item.expiryTime);
  const productKey = crypto.randomBytes(12).toString('hex').toUpperCase();

  fs.readFile(newOrderEmail, { encoding: 'utf-8' }, async function (err, data) {
    const url = `${req.protocol}://${req.get(
      'host'
    )}/login?redirect=panel/subscriptions`;

    data = data.toString();
    data = data
      .replace(/##replaceUrl/g, url)
      .replace(/##softwareName/g, subscription[0].name)
      .replace(/##subscriptionName/g, subscription[0].item.name)
      .replace(/##subscriptionPrice/g, subscription[0].item.price)
      .replace(
        /##subscriptionExpiryDate/g,
        orderExpDate.toString().slice(0, 10)
      )
      .replace(/##productKey/g, productKey);

    let admins = await User.find({ role: 'admin' })
      .sort({ createdAt: -1 })
      .limit(2);

    await Promise.all(
      admins.map(async (admin) => {
        try {
          await sendEmail({
            email: admin.email,
            subject: 'Opsoftware New Order',
            message: data,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );
  });

  const order = await Order.create({
    orderItem: subscription[0],
    paymentInfo,
    user: req.user._id,
    expiryDate: orderExpDate,
    productKey,
  });
  await order.save();
  res.status(201).json({ success: true, order });
});

// Get users Orders --admin
exports.userOrders = tryCatchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.params.id });

  res.status(200).json({ success: true, orders });
});

// Get my Orders
exports.myOrders = tryCatchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, orders });
});
// Get single Order
exports.getSingleOrder = tryCatchError(async (req, res, next) => {
  let order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({ success: true, order });
});

// Get all Orders --ADMIN
exports.getAllOrders = tryCatchError(async (req, res, next) => {
  let orders = await Order.find();
  let totalPrice = 0;
  orders.forEach((o) => {
    totalPrice += Number(o.totalPrice);
  });
  res.status(200).json({ success: true, orders, totalPrice });
});

// Delete order
exports.deleteOrder = tryCatchError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Doesn't Exists"));
  }
  let deleteOrder = await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});
