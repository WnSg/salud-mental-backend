const express = require('express');
const { getTest, submitAnswers } = require('../controllers/testController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Ruta para obtener las preguntas y respuestas del test de ansiedad
router.get('/ansiedad', getTest);

// Ruta protegida para enviar respuestas y guardar el resultado
router.post('/ansiedad/responder', authenticateToken, submitAnswers);

module.exports = router;
