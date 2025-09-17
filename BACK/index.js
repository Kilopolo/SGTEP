import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// --------------------
// Conexión a MongoDB
// --------------------
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas con IPs directas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// --------------------
// Modelo de Notas
// --------------------
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// --------------------
// Rutas CRUD de Notas
// --------------------

// Crear nota
app.post("/notes", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Leer todas las notas
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer nota por ID
app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar nota
app.put("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar nota
app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json({ message: "Nota eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
