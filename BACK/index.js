import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// CORS: permitir solo tu frontend (mejor que "*")
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());

// conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  // opciones si necesitas
}).then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error MongoDB:", err.message);
    process.exit(1);
  });

/* ---- MODELO Note ---- */
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
noteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
const Note = mongoose.model("Note", noteSchema);

/* ---- RUTAS CRUD ---- */
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: "Nota no encontrada" });
  res.json(note);
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = new Note({ title, content, tags });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Nota eliminada" });
});

/* ---- arrancar servidor ---- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API escuchando en puerto ${PORT}`));
