const express = require('express');
const {
  getTests,
  getTest,
  submitAnswers,
} = require('../controllers/testController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Ruta para obtener las preguntas y respuestas de los test
router.get('/', getTests); // Obtiene la lista de tests disponibles
router.get('/:id', getTest); // Obtiene un test específico por ID

// Ruta protegida para enviar respuestas y guardar el resultado
router.post('/responder', authenticateToken, submitAnswers);

module.exports = router;
