import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNoteById, shareNote } from "../../services/api";
import type { Note } from "../../types";
import toast from "react-hot-toast";

export default function NotesShare() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [targetUserId, setTargetUserId] = useState("");

  useEffect(() => {
    if (!id) return;
    getNoteById(id).then(setNote).catch(console.error);
  }, [id]);

  if (!note) return <p>Cargando...</p>;

  const handleShare = async () => {
    if (!id || !targetUserId) return;
    try {
      await shareNote(id, targetUserId);
      toast.success("Nota compartida correctamente 🎉");
      setTargetUserId("");
    } catch (err) {
      console.error(err);
      toast.error("Error al compartir la nota");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Compartir Nota</h2>
      <p className="mb-4">Nota: {note.title}</p>

      <input
        type="text"
        placeholder="ID del usuario"
        value={targetUserId}
        onChange={(e) => setTargetUserId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleShare}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Compartir
      </button>
    </div>
  );
}
