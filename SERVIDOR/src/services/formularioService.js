// formularioService.js
const { Formulario } = require('../db');  // Asegúrate de que esta importación sea correcta

// Función para obtener todos los formularios
async function obtenerTodosFormularios() {
  try {
    const formularios = await Formulario.findAll();  // Accede al modelo correctamente
    return formularios;
  } catch (error) {
    console.error('Error al obtener los formularios:', error);
    throw new Error('No se pudieron obtener los formularios');
  }
}

module.exports = { obtenerTodosFormularios };
