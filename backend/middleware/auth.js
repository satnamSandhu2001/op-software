const tryCatchError = require('./tryCatchError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticatedUser = tryCatchError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token || token === null) {
    return next(new ErrorHandler('Please Login to access this record', 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  if (!req.user) {
    return next(new ErrorHandler('Please Login to access this record', 401));
  }
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`You are not allowed to access this resourse`, 403)
      );
    }
    next();
  };
};
