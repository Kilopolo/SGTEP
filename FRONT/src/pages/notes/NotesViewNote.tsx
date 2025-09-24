import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "../../services/api";
import type { Note } from "../../types";

export default function NotesView() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getNoteById(id)
      .then((data) => {
        setNote(data);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar la nota");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Cargando nota...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!note) return <p className="p-6">No se encontró la nota.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
        <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
        <p className="mt-4 text-sm text-gray-500">
          Compartida el: {note.createdAt ? new Date(note.createdAt).toLocaleString() : "Fecha desconocida"}
        </p>
      </div>
    </div>
  );
}
