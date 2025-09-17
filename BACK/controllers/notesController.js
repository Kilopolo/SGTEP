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

// Obtener todas las notas
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener nota por ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar nota
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrar nota
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json({ message: "Nota eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
