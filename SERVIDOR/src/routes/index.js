const { Router } = require('express');
const formularioRoutes = require('./formulario.routes.js');

const router = Router();

router.use('/formulario', formularioRoutes);

module.exports = router;
