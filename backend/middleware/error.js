const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  console.log(err);

  // Wrong mongoDb ID error
  if (err.name === 'CastError') {
    const message = `Resourse not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose dublicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already registered`;
    err = new ErrorHandler(message, 400);
  }

  // Invalid JWT token
  if (err.name === 'jsonwebtoken') {
    const message = `Invalid Authentication Token, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expired Token
  if (err.name === 'TokenExpiredError') {
    const message = `Session Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
