const { Server } = require('socket.io');
const { isAllowedOrigin: defaultOriginCheck } = require('./cors');

let io;

function initSocket(server, isAllowedOrigin = defaultOriginCheck) {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
          callback(null, true);
        } else {
          callback(new Error('CORS not allowed'));
        }
      },
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on('admin-room', (room) => {
      socket.join(room);
    });
  });

  return io;
}

function getIO() {
  return io;
}

module.exports = { initSocket, getIO };
