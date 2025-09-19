import { useParams } from "react-router-dom";
import type { Note } from "../../types";
import { useState, useEffect } from "react";
import { getNoteById } from "../../services/api";

export default function NotesShare() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (!id) return;

    // Forma segura de tipar
    const fetchNote = async () => {
      try {
        const fetchedNote: Note = await getNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) return <p>Cargando...</p>;

  const shareUrl = `${window.location.origin}/notes/view/${note.id}`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Compartir Nota</h2>
      <p>Enlace para compartir:</p>
      <input
        readOnly
        className="w-full p-2 border rounded"
        value={shareUrl}
        onClick={(e) => (e.target as HTMLInputElement).select()}
      />
    </div>
  );
}
