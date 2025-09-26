import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../../components/NoteForm";
import { getNoteById } from "../../services/api";
import { useEffect, useState } from "react";
import type { Note } from "../../types";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000");

export default function NotesEdit() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    // Cargar la nota inicial (REST)
    getNoteById(id).then(setNote);

    // Unirse a la sala de sockets
    socket.emit("join_note", { noteId: id, userId: "me" });

    // Escuchar cambios de otros usuarios
    socket.on("note_updated", (data) => {
      setNote((prev) => (prev ? { ...prev, content: data.content } : prev));
    });

    return () => {
      socket.off("note_updated");
    };
  }, [id]);

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;

    // Emitir cambios al socket
    socket.emit("update_note", { noteId: id, content: data.content });

    toast.success("Cambios enviados ✅ (colaborativo)");
    navigate("/notes/view");
  };

  if (!note) return <p>Cargando...</p>;

  return <NoteForm initial={note} onSubmit={handleSubmit} />;
}
