import { Note } from "../models/Note.js";

// Crear nota
export const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todas las notas
 * @returns {Promise<Object[]>} - Notas guardadas en la base de datos
 */
export const getNotes = async (req, res) => {
  try {
    // Buscar todas las notas en la base de datos
    const notes = await Note.find();
    // Devolver las notas encontradas
    res.json(notes);
  } catch (err) {
    // Devolver un error si ocurre alguno
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtener una nota por su ID
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<Object>} - Nota encontrada en la base de datos
 */
export const getNoteById = async (req, res) => {
  try {
    // Buscar la nota por su ID en la base de datos
    const note = await Note.findById(req.params.id);
    // Si no se encuentra la nota, devolver un error
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    // Devolver la nota encontrada
    res.json(note);
  } catch (err) {
    // Devolver un error si ocurre alguno
    res.status(500).json({ error: err.message });
  }
};

/**
 * Actualizar una nota existente
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<Object>} - Nota actualizada en la base de datos
 */
export const updateNote = async (req, res) => {
  try {
    // Buscar la nota por su ID en la base de datos
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Si no se encuentra la nota, devolver un error
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    // Devolver la nota actualizada
    res.json(note);
  } catch (err) {
    // Devolver un error si ocurre alguno
    res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar una nota por su ID
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<Object>} - Nota eliminada en la base de datos
 */
export const deleteNote = async (req, res) => {
  try {
    // Buscar la nota por su ID en la base de datos
    // y eliminarla
    const note = await Note.findByIdAndDelete(req.params.id);
    // Si no se encuentra la nota, devolver un error
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    // Devolver un mensaje de éxito al eliminar la nota
    res.json({ message: "Nota eliminada correctamente" });
  } catch (err) {
    // Devolver un error si ocurre alguno
    res.status(500).json({ error: err.message });
  }
};
