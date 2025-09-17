import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      if (res.token) {
        // Guardamos el JWT en localStorage
        localStorage.setItem("token", res.token);

        // Redirigir al dashboard
        navigate("/home"); // Cambia "/home" por la ruta de tu dashboard
      } else {
        // Mostrar mensaje de error
        setMessage(res.message || "Usuario o contraseña incorrectos ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Ocurrió un error en el login ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>
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
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Entrar
        </button>
        {message && (
          <p className={`text-center text-sm mt-2 ${res?.token ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
