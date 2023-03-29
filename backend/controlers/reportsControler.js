const Order = require('../models/orderModel');
const User = require('../models/userModel');
const tryCatchError = require('../middleware/tryCatchError');

exports.getStats = tryCatchError(async (req, res, next) => {
  let { date } = req.body;
  let lastDate = new Date(date);

  let orders = await Order.aggregate([
    { $unwind: '$orderItem' },
    { $unwind: '$orderItem.item' },
    {
      $group: {
        _id: null,
        length: {
          $sum: 1,
        },
        payment: {
          $sum: '$orderItem.item.price',
        },
      },
    },
  ]);
  let lastMonthOrders = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: lastDate },
      },
    },
    {
      $group: {
        _id: null,
        length: { $sum: 1 },
        payment: {
          $sum: '$orderItem.item.price',
        },
      },
    },
  ]);
  // total payment software wise
  const softwareProfit = await Order.aggregate([
    [
      {
        $group: {
          _id: '$orderItem.name',
          length: {
            $sum: 1,
          },
          profit: {
            $sum: '$orderItem.item.price',
          },
          software_id: { $first: '$orderItem._id' },
        },
      },
      {
        $addFields: {
          ids: {
            $getField: {
              field: { $literal: '$_id' },
              input: '$orderItem.item',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          ids: 1,
          length: 1,
          profit: 1,
          name: '$_id',
          software_id: 1,
        },
      },
    ],
  ]);
  // user count role wise
  let usersCount = await User.aggregate([
    [
      {
        $group: {
          _id: '$role',
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          role: '$_id',
          total: 1,
        },
      },
    ],
  ]);

  let stats = {
    orders: {
      totalOrders: orders,
      lastMonthOrders,
    },
    users: usersCount,
    software: { earning: softwareProfit },
  };
  res.status(200).json({ success: true, stats });
});
