import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNoteById } from "../../services/api";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import type { Note } from "../../types";
import toast from "react-hot-toast";

export default function NotesDelete() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getNoteById(id).then(setNote);
  }, [id]);

  const handleConfirm = async () => {
    if (!id) return;
    await deleteNote(id);
    toast.success("Nota eliminada ✅");
    navigate("/notes/view");
  };

  if (!note) return <p>Cargando...</p>;

  return (
    <ConfirmDialog
      message={`¿Estás seguro que quieres eliminar la nota "${note.title}"?`}
      onConfirm={handleConfirm}
      onCancel={() => navigate("/notes/view")}
    />
  );
}
