import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Configurar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL, // http://localhost:5173
  credentials: true
}));

// Rutas
app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);

// Ejemplo de ruta protegida
import { protect } from "./middleware/authMiddleware.js";
app.get("/profile", protect, (req, res) => {
  res.json({ message: `Hola usuario ${req.user.id}` });
});

// ejemplo ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Root
app.get("/", (req, res) => {
  res.send("API SGTEP funcionando 🚀");
});


// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});






