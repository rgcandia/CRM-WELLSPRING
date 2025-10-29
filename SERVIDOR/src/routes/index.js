const { Router } = require('express');
const formularioRoutes = require('./formulario.routes.js');
const login = require('./login.routes.js');
const crearEvento = require('./calendar.routes.js');
const router = Router();

router.use('/formulario', formularioRoutes);
router.use('/login',login);
router.use('/calendar',crearEvento);

module.exports = router;
