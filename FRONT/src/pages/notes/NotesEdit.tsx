import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../../components/NoteForm";
import { updateNote, getNoteById } from "../../services/api";
import { useEffect, useState } from "react";
import type { Note} from "../../types";
import toast from "react-hot-toast";

export default function NotesEdit() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getNoteById(id).then(setNote);
  }, [id]);

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;
    await updateNote(id, data);
    toast.success("Nota actualizada ✅");
    navigate("/notes/view");
  };

  if (!note) return <p>Cargando...</p>;

  return <NoteForm initial={note} onSubmit={handleSubmit} />;
}
