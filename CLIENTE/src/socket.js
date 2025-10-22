import io from 'socket.io-client';

let socket;
const apiUrl = import.meta.env.VITE_API_URL;

// Función para iniciar el socket
export const startSocket = () => {
  socket = io(apiUrl, { transports: ['websocket'] });
  console.log('Connecting socket...');

  if (socket) {
    console.log('Conectado');
    socket.emit('join'); // Enviar "join" si el servidor lo requiere
  }
};

// Función para escuchar el evento 'FormsArray' con los formularios
export const listenForFormsArray = (callback) => {
  if (!socket) {
    console.error('El socket no está conectado');
    return;
  }

  // Escuchar el evento 'FormsArray' que pasa el listado de formularios
  socket.on('FormsArray', (formularios) => {
    console.log('Formularios recibidos:', formularios);
    callback(formularios); // Ejecutar el callback para pasar los formularios al componente
  });
};
