const HelpLine = require('../models/helpLineModel');
const { Op } = require('sequelize');

// Crear una nueva línea de ayuda (Ruta protegida)
exports.createHelpLine = async (req, res) => {
  try {
    const { name, phone, website, category, country } = req.body;
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado

    const helpLine = await HelpLine.create({
      name,
      phone,
      website,
      category,
      country,
      fk_user_id: userId,
    });

    res
      .status(201)
      .json({ message: 'Línea de ayuda creada con éxito', helpLine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la línea de ayuda' });
  }
};

// Listar líneas de ayuda filtradas por país (Ruta pública)
exports.getHelpLinesByCountry = async (req, res) => {
  try {
    const { country } = req.query;

    const helpLines = await HelpLine.findAll({
      where: {
        country: {
          [Op.iLike]: country, // Realiza una comparación insensible a mayúsculas y minúsculas
        },
      },
      attributes: [
        'id',
        'name',
        'phone',
        'website',
        'category',
        'country',
        'created_at',
      ],
    });

    res.status(200).json({ helpLines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las líneas de ayuda' });
  }
};
