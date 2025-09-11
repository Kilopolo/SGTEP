import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center">
      <h1 className="text-4xl font-bold mb-6">Bienvenido al Dashboard 🏠</h1>
      <p className="mb-4">Aquí podrás gestionar tus notas y tareas en equipo.</p>
      <div className="space-x-4">
        <Link
          to="/notes/create"
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Crear Nota
        </Link>
        <Link
          to="/notes/view"
          className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
        >
          Ver Notas
        </Link>
      </div>
    </div>
  );
}
