const express = require('express');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const helpLineRoutes = require('./routes/helpLineRoutes');
const testRoutes = require('./routes/testRoutes');
require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://salud-mental-frontend.vercel.app'], // Permitir localhost y Vercel, // Reemplaza con la URL de tu frontend en producción si es necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rutas
app.use('/users', userRoutes);
app.use('/resources', resourceRoutes);
app.use('/helplines', helpLineRoutes);
app.use('/test', testRoutes);

// Conectar a la base de datos solo si no estamos en pruebas
connectDB();

if (!process.env.JEST_WORKER_ID) { 
  sequelize
    .sync()
    .then(() => console.log('✅ Base de datos sincronizada correctamente.'))
    .catch((err) => console.error('❌ Error al sincronizar la base de datos:', err));

  // Iniciar servidor solo si no estamos en Jest
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
}

module.exports = app;
