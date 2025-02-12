const express = require('express');
const { sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/users', userRoutes);

// Conexión a la base de datos
sequelize.sync()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((error) => console.error('Error al conectar la base de datos:', error));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
