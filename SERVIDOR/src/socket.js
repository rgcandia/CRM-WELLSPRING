const { Server } = require('socket.io');
const { obtenerTodosFormularios } = require('./services/formularioService');
const { setIoInstance } = require('./services/socketService');  // Importar el servicio

function initialSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  setIoInstance(io);  // Configurar la instancia de io en el servicio

  io.on('connection', async (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.id}`);

    try {
      const formularios = await obtenerTodosFormularios();
      console.log('Enviando formularios al cliente:');
      socket.emit('FormsArray', formularios);
    } catch (error) {
      console.error('Error al obtener formularios:', error);
    }

    socket.on('disconnect', () => {
      console.log(`❌ Usuario desconectado: ${socket.id}`);
    });
  });

  return io;
}

module.exports = initialSocket;
