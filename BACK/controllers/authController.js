import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Registro de usuario
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<void>}
 */
export const register = async (req, res) => {
  try {
    // Obtener los datos del usuario de la solicitud
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Si el usuario ya existe, devolver un error
      return res.status(400).json({ error: "Usuario ya registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = new User({ username, email, password: hashedPassword });
    // Guardar el usuario en la base de datos
    await user.save();

    // Devolver una respuesta con un mensaje de éxito
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    // Devolver una respuesta con un error si ocurre alguno
    res.status(500).json({ error: err.message });
  }
};

/**
 * Login user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuario no encontrado" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Contraseña incorrecta" });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Return JWT and user data
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
