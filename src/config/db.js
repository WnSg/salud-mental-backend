const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Render requiere SSL
      rejectUnauthorized: false, // Permite conexiones con certificados no verificados
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((error) =>
    console.error('Error al conectar a la base de datos:', error)
  );

module.exports = sequelize;
