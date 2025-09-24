import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMessage(res.message || "Error en el registro ❌");
    } catch (err) {
      console.error(err);
      setMessage("Ocurrió un error en el registro ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Crear Cuenta</h2>
        <input
          type="text"
          name="username"
          placeholder="Nombre"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Registrarse
        </button>
        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
