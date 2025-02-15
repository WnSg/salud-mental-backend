const express = require('express');
const router = express.Router();
const {
  createHelpLine,
  getHelpLinesByCountry,
} = require('../controllers/helpLineController');
const authenticateToken = require('../middlewares/authenticateToken'); // Middleware JWT para proteger rutas

// Ruta protegida para crear una línea de ayuda
router.post('/create', authenticateToken, createHelpLine);

// Ruta pública para listar líneas de ayuda por país
router.get('/getlist', getHelpLinesByCountry);

module.exports = router;
