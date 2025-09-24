import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  shareNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post("/:id/share", protect, shareNote);
export default router;
