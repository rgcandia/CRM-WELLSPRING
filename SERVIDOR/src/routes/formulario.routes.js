// formulario.routes.js

const { Router } = require('express');
const router = Router();
const { Formulario } = require('../db.js');
const {emitEvent} = require('../services/socketService.js');
const { obtenerTodosFormularios } = require('../services/formularioService');  // Importamos el servicio para obtener formularios

// Ruta POST /formulario
router.post('/', async (req, res) => {
  const form = req.body;

  try {
    // Guardar en la base de datos
    await Formulario.create({
      id: form.email,   // Usamos el email como id
      data: form        // Todo el JSON se guarda en "data"
    });

    console.log('📩 Formulario recibido y guardado:', form);

    // Obtener todos los formularios actuales
    const formularios = await obtenerTodosFormularios();

    // Emitir un mensaje de éxito y los formularios actualizados a través de Socket
    const alerta = {
      tipo: 'info',  // Puede ser 'success', 'error', 'info', 'otro'
      mensaje: 'Ingresó un nuevo formulario'
    };

    // Emitir el evento 'formulario-alerta' con la alerta y los formularios actualizados
    emitEvent('formulario-alerta', { alerta, formularios });  // Emitir la alerta usando `io`

    res.status(200).json({ message: 'Formulario guardado correctamente' });
  } catch (err) {
    console.error('Error al guardar el formulario:', err);

    res.status(500).json({ error: 'No se pudo guardar el formulario' });
  }
});

module.exports = router;
