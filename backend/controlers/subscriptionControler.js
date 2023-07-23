const tryCatchError = require('../middleware/tryCatchError');
const ErrorHandler = require('../utils/errorHandler');
const Subscription = require('../models/subscriptionModel');

// Get all subscription
exports.getAllSubscriptions = tryCatchError(async (req, res, next) => {
  const subscriptions = await Subscription.find();
  res.status(200).json({
    success: true,
    subscriptions,
  });
});

// Get single subscription details
exports.getSubscriptionDetails = tryCatchError(async (req, res, next) => {
  let subscription = await Subscription.findById(req.params.id);
  if (!subscription) {
    return next(
      new ErrorHandler('Subscription not found or has been deleted', 404)
    );
  }
  return res.status(200).json({ success: true, subscription });
});

// Update Subscription --Admin
exports.updateSubscription = tryCatchError(async (req, res, next) => {
  const { item, name } = req.body;
  const { id } = req.params;
  await Subscription.findByIdAndUpdate(id, {
    $set: { item, name },
  });
  res.status(200).json({ success: true, message: 'Subscription Updated' });
});
