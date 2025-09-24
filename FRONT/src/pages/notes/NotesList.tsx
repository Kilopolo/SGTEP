import { useEffect, useState } from "react";
import type { Note } from "../../types";
import { getNotes, deleteNote } from "../../services/api";
import NoteCard from "../../components/NoteCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const data = (await getNotes()) as Note[];
      setNotes(data);
    } catch (err) {
      console.error("Error cargando notas", err);
      toast.error("Error cargando notas");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (note: Note) => {
    navigate(`/notes/edit/${ note.id}`);
  };

const handleDelete = async (note: Note) => {
  if (!note.id) return;
  await deleteNote(note.id);
  toast.success("Nota eliminada");
  fetchNotes();
};

  const handleShare = (note: Note) => {
    navigate(`/notes/share/${ note.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Notas Guardadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={ note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            No tienes notas guardadas todavía.
          </p>
        )}
      </div>
    </div>
  );
}
