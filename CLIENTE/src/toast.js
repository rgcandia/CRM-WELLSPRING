// src/notifications.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Funciones existentes
export const showSuccess = (message = 'Formulario enviado correctamente') => {
  toast.success(message, {
    position: "top-right",
    autoClose: 4000, // Se cierra automáticamente en 4s
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

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

/**
 * Función que maneja alertas de diferentes tipos
 * @param {Object} alert - El objeto con tipo y mensaje
 * @param {string} alert.tipo - Tipo de alerta (success, error, warning, info)
 * @param {string} alert.mensaje - Mensaje de la alerta
 */
export const showAlert = ({ tipo, mensaje }) => {
  switch (tipo) {
    case "success":
      return showSuccess(mensaje);
    case "error":
      return showError(mensaje);
    case "warning":
      return toast.warning(mensaje, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    case "info":
      return toast.info(mensaje, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    default:
      return toast(mensaje, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
};
