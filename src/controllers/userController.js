const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, age, gender, nationality } =
      req.body;

    // Validar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
      age,
      gender,
      nationality,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al registrar usuario', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        gender: user.gender,
        nationality: user.nationality,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario autenticado está accediendo a su propio ID
    if (req.user.id !== parseInt(id, 10)) {
      return res.status(403).json({ message: 'Acceso no autorizado.' });
    }

    // Buscar usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener usuario', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, age, gender, nationality } = req.body;

    // Verificar si el usuario autenticado está actualizando su propio ID
    if (req.user.id !== parseInt(id, 10)) {
      return res.status(403).json({ message: 'Acceso no autorizado.' });
    }

    // Buscar usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar datos del usuario
    await user.update({ first_name, last_name, age, gender, nationality });

    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario autenticado está eliminando su propio ID
    if (req.user.id !== parseInt(id, 10)) {
      return res.status(403).json({ message: 'Acceso no autorizado.' });
    }

    // Buscar usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar usuario
    await user.destroy();

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
