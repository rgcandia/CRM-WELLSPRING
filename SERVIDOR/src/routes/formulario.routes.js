const { Router } = require('express');
const router = Router();

// Ruta POST /formulario
router.post('/', (req, res) => {
  const form = req.body;
  console.log('📩 Formulario recibido:', form);

  // Podés verificar qué te llega
  // console.log('Email:', form.email);
  // console.log('Nombre:', form.nombre);

  res.status(200).json({ message: 'Formulario recibido correctamente' });
});

module.exports = router;
