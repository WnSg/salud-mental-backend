const request = require('supertest');
const app = require('../src/index'); // Importa la instancia de la app

describe('🔹 Pruebas de API para Usuarios', () => {
  let userToken;
  let userId;

  test('✅ Registro de usuario', async () => {
    const res = await request(app).post('/users/register').send({
      email: 'test@example.com',
      password: 'TestPassword123',
      first_name: 'Test',
      last_name: 'User',
      age: 25,
      gender: 'Hombre',
      nationality: 'España',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
    userId = res.body.user.id; // Guardamos el ID del usuario
  });

  test('✅ Inicio de sesión', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'test@example.com',
      password: 'TestPassword123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    userToken = res.body.token; // Guardamos el token para futuras pruebas
  });

  test('✅ Obtener información del usuario (Rutas protegidas)', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  test('✅ Actualizar usuario', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        first_name: 'UpdatedTest',
        last_name: 'UpdatedUser',
        age: 30,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Usuario actualizado exitosamente');
  });

  test('✅ Eliminar usuario', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Usuario eliminado exitosamente');
  });
});
