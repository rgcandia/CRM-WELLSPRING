const { Server } = require('socket.io');

let io;

// Función para inicializar el socket con el httpServer pasado por parámetro
function initialSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.id}`);

    // Evento de desconexión
    socket.on('disconnect', () => {
      console.log(`❌ Usuario desconectado: ${socket.id}`);
    });

    // Evento de ejemplo
    socket.on('mensaje', (data) => {
      console.log('📩 Mensaje recibido:', data);
      // Reenviar a todos los conectados
      io.emit('mensaje', data);
    });
  });

  return io;
}

module.exports = initialSocket;
