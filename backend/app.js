const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const path = require('path');

// config
require('dotenv').config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes import
const subscriptionRoute = require('./routes/subscriptionRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');
const softwareRoute = require('./routes/softwareRoute');
const reportsRoute = require('./routes/reportsRoute');

app.use('/api/v1', subscriptionRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);
app.use('/api/v1', softwareRoute);
app.use('/api/v1', reportsRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
