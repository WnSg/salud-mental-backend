const { sequelize } = require('../src/config/db');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sincroniza la base de datos antes de los tests
});

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión a la base de datos después de los tests
});
