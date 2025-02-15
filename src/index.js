const express = require('express');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const helpLineRoutes = require('./routes/helpLineRoutes');
require('dotenv').config();
const sequelize = require('./config/db');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

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
