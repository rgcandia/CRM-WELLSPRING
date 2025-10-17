// File: routes/login.js
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

// Array de usuarios simulados
const usuarios = [
  { email: 'admin@test.com', password: '123456', nombre: 'Admin' },
  { email: 'lara@test.com', password: 'abc123', nombre: 'Lara' }
];

// Clave secreta para firmar el JWT (guardala en .env en producción)
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_123';

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario
  const user = usuarios.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Crear token
  const token = jwt.sign(
    { email: user.email, nombre: user.nombre },
    JWT_SECRET,
    { expiresIn: '1h' } // token válido 2 horas
  );

  res.json({ message: 'Login correcto', token, user: { email: user.email, nombre: user.nombre } });
});

module.exports = router;
