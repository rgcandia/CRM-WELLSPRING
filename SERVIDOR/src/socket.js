// socket.js

const { Server } = require('socket.io');
const { obtenerTodosFormularios } = require('./services/formularioService');  // Importamos el servicio

let io;

function initialSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', async (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.id}`);

    try {
      // Obtener los formularios al momento de la conexión
      const formularios = await obtenerTodosFormularios();
      console.log('Enviando formularios al cliente:');

      // Emitir los formularios al cliente conectado
      socket.emit('FormsArray', formularios);
    } catch (error) {
      console.error('Error al obtener formularios:', error);
    }

    // Evento de desconexión
    socket.on('disconnect', () => {
      console.log(`❌ Usuario desconectado: ${socket.id}`);
    });

    // Otros eventos que quieras manejar pueden ir aquí
  });

  return io;
}

module.exports = initialSocket;