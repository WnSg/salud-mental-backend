const express = require('express');
const router = express.Router();
const {
  createResource,
  getResourcesByCategory,
} = require('../controllers/resourceController');
const authenticateToken = require('../middlewares/authenticateToken'); // Middleware JWT para proteger rutas

// Ruta protegida para crear recursos educativos
router.post('/create', authenticateToken, createResource);

// Ruta pública para consultar recursos por categoría
router.get('/getlist', getResourcesByCategory);

module.exports = router;
