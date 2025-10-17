// src/utils/notifications.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Mostrar un mensaje de éxito
 * @param {string} message - Texto del mensaje
 */
export const showSuccess = (message = 'Formulario enviado correctamente') => {
  toast.success(message, {
    position: "top-right",
    autoClose: 4000, // se cierra automáticamente en 3s
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

/**
 * Mostrar un mensaje de error
 * @param {string} message - Texto del mensaje
 */
export const showError = (message = 'Hubo un error al enviar el formulario') => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
