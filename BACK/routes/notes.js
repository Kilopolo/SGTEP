import express from "express";
import { Note } from "../models/Note.js";

const router = express.Router();

// Crear nota
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las notas
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una nota por id
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una nota
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una nota
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json({ message: "Nota eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
