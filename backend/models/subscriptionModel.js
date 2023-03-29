const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  item: [
    {
      name: {
        type: String,
        required: [true, 'Enter Subscription Name'],
      },
      description: {
        type: String,
        required: [true, 'Enter description'],
      },
      price: {
        type: Number,
        required: [true, 'Please Enter Price'],
        maxLength: [10, 'Price cannot exceed 10 characters'],
      },
      expiryTime: {
        type: Number,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: [true, 'Enter Software Name'],
  },
  filename: {
    type: String,
    required: true,
  },
});

let Subscription = mongoose.model('Subscription', subscriptionSchema);
Subscription.createIndexes();
module.exports = Subscription;
