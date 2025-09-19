import { useState } from "react";
import { createNote } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NotesCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote({ title, content });
      toast.success("Nota creada correctamente");
      setTitle("");
      setContent("");
      navigate("/notes"); // redirigir a la lista de notas
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la nota");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-[400px]"
      >
        <h2 className="text-xl font-bold text-center">Crear Nota</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-32"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Guardar Nota
        </button>
      </form>
    </div>
  );
}
