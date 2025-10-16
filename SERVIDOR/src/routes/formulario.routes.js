const { Router } = require('express');
const router = Router();
const { Formulario } = require('../db.js'); // <-- importá tu modelo

// Ruta POST /formulario
router.post('/', async (req, res) => {
  const form = req.body;

  try {
    // Guardar en la base de datos
    await Formulario.create({
      id: form.email,   // usamos el email como id
      data: form        // todo el JSON se guarda en "data"
    });

    console.log('📩 Formulario recibido y guardado:', form);
    res.status(200).json({ message: 'Formulario guardado correctamente' });
  } catch (err) {
    console.error('Error al guardar el formulario:', err);
    res.status(500).json({ error: 'No se pudo guardar el formulario' });
  }
});

module.exports = router;
