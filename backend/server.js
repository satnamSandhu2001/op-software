// config
require('dotenv').config({ path: 'backend/config/config.env' });

const { Server } = require('socket.io');
const app = require('./app');
const connectToMongo = require('./config/db');
const http = require('http');

//  handling UnCaught Exception --- should be at top
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down server due to uncaughtException');
  process.exit(1);
});

connectToMongo();

const httpServer = http.createServer(app);
// global keyword is alternative in nodejs like 'window' in browser
global.io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL },
});

io.on('connection', (socket) => {
  console.log('socket-connected ############ : ', socket.id);
});

const PORT = process.env.PORT || 5500;

const server = httpServer.listen(PORT, () => {
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
