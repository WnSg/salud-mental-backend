const express = require('express');
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Rutas Publicas
router.post('/register', registerUser); // Registro de usuario
router.post('/login', loginUser); // Inicio de sesión

// Rutas protegidas
router.use(authenticateToken); // Aplica el middleware a todas las rutas siguientes
router.get('/:id', getUser); // Obtener información del usuario por ID
router.put('udp/:id', updateUser); // Actualizar información del usuario por ID
router.delete('del/:id', deleteUser); // Eliminar usuario por ID

module.exports = router;
