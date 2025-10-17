const { Router } = require('express');
const formularioRoutes = require('./formulario.routes.js');
const login = require('./login.routes.js');
const router = Router();

router.use('/formulario', formularioRoutes);
router.use('/login',login);

module.exports = router;
