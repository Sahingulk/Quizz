// const socketIo = require('socket.io');

// function setupSockets(server) {
//   const io = socketIo(server, { cors: { origin: '*' } });
//   io.on('connection', (socket) => {
//     console.log('Yeni bir kullanıcı bağlandı:', socket.id);
//     // Buraya socket event'leri eklenecek
//     socket.on('disconnect', () => {
//       console.log('Kullanıcı ayrıldı:', socket.id);
//     });
//   });
// }
// module.exports = { setupSockets };
const socketIo = require('socket.io');
const { quizSocket } = require('./quiz');

function setupSockets(server) {
  const io = socketIo(server, { cors: { origin: '*' } });
  quizSocket(io);
}

module.exports = { setupSockets };
