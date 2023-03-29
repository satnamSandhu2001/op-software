const app = require('./app');
const connectToMongo = require('./config/db');

// handling UnCaught Exception --- should be at top
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down server due to uncaughtException');
  process.exit(1);
});

// config
require('dotenv').config({ path: 'backend/config/config.env' });

const PORT = process.env.PORT || 5500;
connectToMongo();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const server = app.listen(PORT, () => {
  console.log(`\nOpSoftware App Listening on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection --- should be at bottom of everything
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down sever due to Unhandled Promise Rejection');

  server.close(() => {
    process.exit(1);
  });
});
