const app = require('./app');
const connectToMongo = require('./config/db');

// config
require('dotenv').config({ path: 'backend/config/config.env' });

// handling UnCaught Exception --- should be at top
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down server due to uncaughtException');
  process.exit(1);
});

const PORT = process.env.PORT || 5500;
connectToMongo();

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
