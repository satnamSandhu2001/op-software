const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItem: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  paymentInfo: {
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productKey: {
    type: String,
    required: true,
  },

  expiryDate: {
    type: Date,
    required: true,
  },
});

let Order = mongoose.model('Order', orderSchema);
Order.createIndexes();
module.exports = Order;
