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
      const { email, ...restoFormulario } = form;
    await Formulario.create({
      email: form.email,  
      data: restoFormulario        // Todo el JSON se guarda en "data"
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



// 🟡 Actualizar un formulario (PUT /formulario/:id)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const nuevosDatos = req.body;

  try {
    const formulario = await Formulario.findByPk(id);

    if (!formulario) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }

    // Desestructuramos solo los campos que queremos actualizar
    const {
      email,
      data,
      read,
      scheduled,
      scheduleDate,
      notes
    } = nuevosDatos;

    // Actualizamos
    await formulario.update({
      email,
      data,
      read,
      scheduled,
      scheduleDate,
      notes
    });

    console.log(`📝 Formulario actualizado (${id}):`, nuevosDatos);

    // Traemos todos los formularios actualizados para emitir por socket
    const formularios = await obtenerTodosFormularios();

    const alerta = {
      tipo: 'success',
      mensaje: `Formulario ${id} actualizado correctamente`
    };

    emitEvent('formulario-alerta', { alerta, formularios });

    res.status(200).json({ message: 'Formulario actualizado correctamente', formulario });
  } catch (err) {
    console.error('❌ Error al actualizar el formulario:', err);
    res.status(500).json({ error: 'No se pudo actualizar el formulario' });
  }
});


module.exports = router;
