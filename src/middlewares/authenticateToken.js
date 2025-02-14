const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1]; // Extrae el token del encabezado "Authorization"

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    req.user = user; // Agrega los datos del usuario decodificados al request
    next(); // Llama al siguiente middleware o controlador
  });
};

module.exports = authenticateToken;
