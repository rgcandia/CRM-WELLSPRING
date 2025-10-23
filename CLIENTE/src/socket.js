import io from 'socket.io-client';
import { showAlert } from './toast.js';  // Asegúrate de importar la función que maneja las alertas

let socket;
const apiUrl = import.meta.env.VITE_API_URL; // Tu URL de la API

// Función para iniciar el socket
export const startSocket = () => {
  socket = io(apiUrl, { transports: ['websocket'] });
  console.log('Connecting socket...');

  if (socket) {
    console.log('Conectado');
    socket.emit('join'); // Enviar "join" si el servidor lo requiere
  }
};

// Función para escuchar los eventos 'FormsArray' y 'formulario-alerta'
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

  // Escuchar el evento 'formulario-alerta' y manejar tanto la alerta como los formularios
  socket.on('formulario-alerta', (data) => {
    const { alerta, formularios } = data;
    console.log('Alerta recibida:', alerta);
    console.log('Formulario actualizado:', formularios);

    // Mostrar la alerta usando toast.js
    showAlert(alerta); // Pasar el objeto alerta directamente a la función showAlert

    // Ejecutar el callback con ambos datos: formularios y alerta
    callback(formularios); // Pasar los formularios
  });
};
