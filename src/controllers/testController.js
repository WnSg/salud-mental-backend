const { Test, Question, Answer, UserTest } = require('../models/testModel');

// Obtener la lista de tests con id y título
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.findAll({ attributes: ['id', 'title'] });
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tests' });
  }
};

// Obtener las preguntas y respuestas del test seleccionado
exports.getTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findOne({
      where: { id },
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
    const { userId, testId, answers } = req.body;
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
      fk_test_id: testId,
      result,
    });
    res.json(userTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el resultado' });
  }
};
