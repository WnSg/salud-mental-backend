const { Test, Question, Answer, UserTest } = require('../models/testModel');

// Obtener las preguntas y respuestas del test de ansiedad
exports.getTest = async (req, res) => {
  try {
    const test = await Test.findOne({
      where: { title: 'Test de Ansiedad' },
      include: [{ model: Question, include: [Answer] }],
    });

    if (!test) {
      return res.status(404).json({ error: 'Test no encontrado' });
    }

    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el test' });
  }
};

// Guardar el resultado del test
exports.submitAnswers = async (req, res) => {
  try {
    const { userId, answers } = req.body;
    let score = 0;

    for (const answerId of answers) {
      const ans = await Answer.findByPk(answerId);
      if (ans) score += ans.score;
    }

    let result = 'Bajo';
    if (score >= 10) result = 'Moderado';
    if (score >= 20) result = 'Alto';

    const userTest = await UserTest.create({
      fk_user_id: userId,
      fk_test_id: 1,
      result,
    });
    res.json(userTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el resultado' });
  }
};
