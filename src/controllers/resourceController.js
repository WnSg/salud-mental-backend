const Resource = require('../models/resourceModel');

// Crear recurso educativo (Ruta protegida)
exports.createResource = async (req, res) => {
  try {
    const { title, description, link, category } = req.body;
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado

    const resource = await Resource.create({
      title,
      description,
      link,
      category,
      fk_user_id: userId,
    });

    res.status(201).json({ message: 'Recurso creado con éxito', resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el recurso' });
  }
};

// Consultar recursos por categoría (Ruta pública)
exports.getResourcesByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const resources = await Resource.findAll({
      where: { category },
      attributes: [
        'id',
        'title',
        'description',
        'link',
        'category',
        'created_at',
      ],
    });

    res.status(200).json({ resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los recursos' });
  }
};
