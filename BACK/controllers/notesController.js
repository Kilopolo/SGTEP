import { Note } from "../models/Note.js";
import { User } from "../models/User.js";

// Crear nota
export const createNote = async (req, res) => {
  console.log("[CREATE] req.body:", req.body);
  console.log("[CREATE] req.user:", req.user);

  try {
    const note = new Note({
      ...req.body,
      userId: req.user.id,
    });
    await note.save();

    console.log("[CREATE] Nota creada:", note);
    res.status(201).json(note);
  } catch (err) {
    console.error("[CREATE] Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las notas del usuario
export const getNotes = async (req, res) => {
  console.log("[GET NOTES] Obteniendo notas de userId:", req.user?.id);

  try {
    const notes = await Note.find({ userId: req.user.id });
    console.log("[GET NOTES] Notas encontradas:", notes.length);

    res.json(
      notes.map((n) => ({
        id: n._id.toString(),
        title: n.title,
        content: n.content,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
      }))
    );
  } catch (err) {
    console.error("[GET NOTES] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener nota por ID
export const getNoteById = async (req, res) => {
  console.log("[GET NOTE] req.params.id:", req.params.id);

  try {
    //encontrar nota
    const note = await Note.findById(req.params.id);
    if (!note) {
      console.log("[GET NOTE] Nota no encontrada");
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    console.log("[GET NOTE] Nota encontrada:", note);

    // Permisos
    const isOwner = note.userId.toString() === req.user.id;
    const isShared = note.sharedWith.some((u) => u.toString() === req.user.id);

    if (!isOwner && !isShared) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para ver esta nota" });
    }

    //respuesta
    res.json({
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    });
  } catch (err) {
    console.error("[GET NOTE] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar nota
export const updateNote = async (req, res) => {
  console.log("[UPDATE] req.params.id:", req.params.id);
  console.log("[UPDATE] req.body:", req.body);
  console.log("[UPDATE] req.user:", req.user);

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });

    // Solo el dueño puede actualizar
    if (note.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar esta nota" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.updatedAt = Date.now();

    await note.save();
    console.log("[UPDATE] Nota actualizada:", note);

    res.json(note);
  } catch (err) {
    console.error("[UPDATE] Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Borrar nota
export const deleteNote = async (req, res) => {
  console.log("[DELETE] req.params.id:", req.params.id);
  console.log("[DELETE] req.user:", req.user);

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });

    // Solo el dueño puede borrar
    if (note.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para borrar esta nota" });
    }

    await Note.findByIdAndDelete(req.params.id);

    console.log("[DELETE] Nota eliminada:", note._id.toString());

    res.json({ message: "Nota eliminada correctamente" });
  } catch (err) {
    console.error("[DELETE] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Compartir nota
export const shareNote = async (req, res) => {
  const { id } = req.params; // nota
  const { targetUserId } = req.body; // usuario con quien compartir
  console.log("[SHARE] req.params.id:", id);
  console.log("[SHARE] req.body.email:", targetUserId.email);
  console.log("[SHARE] req.user:", req.user);

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });

    // Solo el dueño puede compartir
    if (note.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para compartir esta nota" });
    }
    // Añadir usuario si no está ya en sharedWith
    if (!note.sharedWith.includes(targetUserId)) {
      note.sharedWith.push(targetUserId);
      await note.save();
      console.log("[SHARE] Nota compartida con:", targetUserId.email);
    }



  } catch (err) {
    console.error("[SHARE] Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};
