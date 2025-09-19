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
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (note: Note) => {
    navigate(`/notes/edit/${note.id}`);
  };

  const handleDelete = async (note: Note) => {
    if (!note.id) return;
    await deleteNote(note.id);
    toast.success("Nota eliminada");
    fetchNotes(); // refrescar lista
  };

  const handleShare = (note: Note) => {
    navigate(`/notes/share/${note.id}`);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
        />
      ))}
    </div>
  );
}
