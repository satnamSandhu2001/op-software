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
const connectSqlDB = require('../config/sqlDb');
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

  // save product key in SQl
  let connection = await connectSqlDB();
  await connection
    .request()
    .query(`insert into OPUser.OpUser (ProductKey) values ('${productKey}')`);

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

  let connection = await connectSqlDB();
  let result = await connection
    .request()
    .query(
      `select * from OPUser.OPUser where ProductKey='${order.productKey}'`
    );

  res.status(200).json({
    success: true,
    order: { data1: order, data2: result.recordset[0] },
  });
});

// Get all Orders --ADMIN
exports.getAllOrders = tryCatchError(async (req, res, next) => {
  let { query } = req.query;

  let orders = await Order.aggregate([
    {
      $addFields: {
        expiryDateStr: {
          $toString: '$expiryDate',
        },
        createdAtStr: {
          $toString: '$createdAt',
        },
      },
    },
    {
      $match: {
        $or: [
          {
            productKey: {
              $regex: query,
              $options: 'i',
            },
          },
          {
            createdAtStr: {
              $regex: query,
              $options: 'i',
            },
          },
          {
            expiryDateStr: {
              $regex: query,
              $options: 'i',
            },
          },
          {
            'paymentInfo.paymentId': {
              $regex: query,
              $options: 'i',
            },
          },
          {
            'orderItem.item.price': {
              $regex: query,
              $options: 'i',
            },
          },
          {
            'orderItem.name': {
              $regex: query,
              $options: 'i',
            },
          },
          {
            'orderItem.item.name': {
              $regex: query,
              $options: 'i',
            },
          },
        ],
      },
    },
    {
      $project: {
        expiryDateStr: 0,
        createdAtStr: 0,
      },
    },
  ]);
  res.status(200).json({ success: true, orders });
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

// get old sql data
exports.getOldSQLData = tryCatchError(async (req, res, next) => {
  let query = req.query.query;

  let pageNo = req.query.pageNo || 1;
  let limit = 20;
  let skip = pageNo == 1 ? 0 : pageNo * limit;

  let sqlQuery = `SELECT *, count(*) over() as totalRows FROM OPUser.OpUser WHERE ProductKey IS NULL${
    query
      ? ' ' +
        `And OpUserId LIKE '%${query}%' OR Narration LIKE '%${query}%' OR MACAddress LIKE '%${query}%' OR RegisterDate LIKE '%${query}%' OR ExpiryDate LIKE '%${query}%'`
      : ''
  } ORDER BY OpUserId OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;

  let sql = await connectSqlDB();
  let results = await sql.request().query(sqlQuery);

  let totalPages = Math.floor(
    results.recordset[0] ? results.recordset[0].totalRows / limit : 0
  );
  res.status(200).json({ results: results.recordset, totalPages });
});
