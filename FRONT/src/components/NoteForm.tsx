import { useState } from "react";
import type { Note } from "../types";

type Props = {
  initial?: Note;
  onSubmit: (data: { title: string; content: string }) => void;
};

export default function NoteForm({ initial, onSubmit }: Props) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    content: initial?.content || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={form.content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows={4}
        required
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Guardar
      </button>
    </form>
  );
}
