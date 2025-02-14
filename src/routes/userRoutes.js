const express = require('express');
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Rutas del CRUD de usuarios
router.post('/register', registerUser); // Registro de usuario
router.post('/login', loginUser); // Inicio de sesión
router.get('/:id', getUser); // Obtener información del usuario por ID
router.put('/:id', updateUser); // Actualizar información del usuario por ID
router.delete('/:id', deleteUser); // Eliminar usuario por ID

module.exports = router;
