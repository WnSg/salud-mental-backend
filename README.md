# salud-mental-backend

Capstone Máster en Desarrollo de Apps y Programación Web - Aplicación Educativa sobre Salud Mental: Leysa Melina Pozo, Wolfran Noe Silva y Jennifer Herrera

# 🧠 Salud Mental Backend

Este es el backend de la aplicación **Salud Mental**, desarrollado con **Node.js** y **Express.js**, con una base de datos PostgreSQL manejada con **Sequelize**. Incluye autenticación con **JWT**, pruebas automatizadas con **Jest y Supertest**, y está desplegado en **Render**.

---

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución para JavaScript.
- **Express.js** - Framework web para manejar las rutas y controladores.
- **Sequelize** - ORM para manejar la base de datos PostgreSQL.
- **PostgreSQL** - Base de datos relacional utilizada.
- **JWT (JSON Web Token)** - Para autenticación segura de usuarios.
- **bcrypt.js** - Para el hashing de contraseñas.
- **dotenv** - Para manejar variables de entorno.
- **Jest & Supertest** - Para pruebas unitarias y de integración.
- **CORS** - Para permitir solicitudes entre el backend y el frontend.
- **ESLint & Prettier** - Para mantener un código limpio y estandarizado.
- **Render** - Para el despliegue del backend en producción.

---

## 📂 Estructura del Proyecto

```
salud-mental-backend/
├── src/
│   ├── config/            # Configuración de la base de datos
│   │   ├── db.js          # Conexión a la base de datos con Sequelize
│   ├── controllers/       # Controladores de la API
│   │   ├── userController.js
│   │   ├── resourceController.js
│   │   ├── helpLineController.js
│   │   ├── testController.js
│   ├── middlewares/       # Middlewares de autenticación y validación
│   │   ├── authenticateToken.js
│   ├── models/            # Modelos de la base de datos con Sequelize
│   │   ├── userModel.js
│   │   ├── resourceModel.js
│   │   ├── helpLineModel.js
│   │   ├── testModel.js
│   ├── routes/            # Definición de rutas de la API
│   │   ├── userRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── helpLineRoutes.js
│   │   ├── testRoutes.js
│   ├── tests/             # Pruebas con Jest y Supertest
│   │   ├── user.test.js
│   ├── utils/             # Utilidades y funciones auxiliares
│   ├── index.js           # Archivo principal del servidor
├── .env                   # Variables de entorno (ignorado en Git)
├── .gitignore             # Archivos y carpetas ignoradas en Git
├── package.json           # Dependencias y scripts
├── README.md              # Documentación del backend
```

---

## 🔑 Autenticación y Seguridad

- **JWT** se utiliza para proteger las rutas privadas.
- **bcrypt.js** se emplea para hashear contraseñas antes de almacenarlas en la base de datos.
- **Middleware de autenticación** para verificar el token antes de acceder a rutas protegidas.

---

## 📡 Endpoints de la API

### 🆓 Rutas Públicas

| Método | Endpoint         | Descripción                |
|--------|-----------------|----------------------------|
| POST   | `/users/register` | Registro de usuario       |
| POST   | `/users/login`   | Inicio de sesión          |

### 🔐 Rutas Protegidas (Requieren Token JWT)

| Método  | Endpoint               | Descripción                          |
|---------|------------------------|--------------------------------------|
| GET     | `/users/:id`           | Obtener información del usuario     |
| PUT     | `/users/update/:id`    | Actualizar datos del usuario        |
| DELETE  | `/users/delete/:id`    | Eliminar usuario                    |
| GET     | `/resources/getlist`   | Obtener lista de recursos           |
| POST    | `/resources/create`    | Crear un nuevo recurso              |
| GET     | `/helplines/getlist`   | Obtener líneas de ayuda disponibles |
| POST    | `/test/responder`      | Enviar respuestas a test            |

---

## ✅ Pruebas y Cobertura de Código

Para ejecutar las pruebas unitarias y de integración, usa:

```sh
NODE_ENV=test npm test
```

Para obtener un informe de cobertura:

```sh
npm run test -- --coverage
```

Esto mostrará estadísticas como:
- **% de líneas de código cubiertas**
- **% de funciones testeadas**
- **% de ramas evaluadas**

El reporte aparecerá en: `coverage/lcov-report/index.html`.

---

## 🚀 Despliegue

La API está desplegada en:

```
https://capstone-salud-mental-backend.onrender.com
```

---

## 📌 Instalación y Uso

### 1️⃣ Clonar el Repositorio

```sh
git clone https://github.com/usuario/salud-mental-backend.git
cd salud-mental-backend
```

### 2️⃣ Instalar Dependencias

```sh
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` y configura:

```ini
DATABASE_URL=postgres://usuario:contraseña@host:puerto/basededatos
JWT_SECRET=clave_secreta_para_jwt
PORT=3000
```

### 4️⃣ Iniciar el Servidor

```sh
npm start
```

El servidor estará disponible en `http://localhost:3000`.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---