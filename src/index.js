const express = require('express');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const helpLineRoutes = require('./routes/helpLineRoutes');
require('dotenv').config();
const sequelize = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
// Permitir solicitudes desde tu frontend (React)
app.use(
    cors({
      origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend en producción si es necesario
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    })
  );

// Rutas
app.use('/users', userRoutes);
app.use('/resources', resourceRoutes);
app.use('/helplines', helpLineRoutes);

// Conexión a la base de datos
sequelize
  .sync()
  .then(() => console.log('Base de datos sincronizada correctamente.'))
  .catch((err) => console.error('Error al sincronizar la base de datos:', err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
