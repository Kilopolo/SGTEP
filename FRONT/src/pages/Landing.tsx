export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Bienvenido a SGTEP 🚀</h1>
      <p className="text-lg mb-6">
        Gestiona tus tareas de equipo de manera sencilla, colaborativa y eficiente.
      </p>
      <div className="space-x-4">
        <a href="/register" className="px-4 py-2 bg-white text-blue-600 font-bold rounded shadow hover:bg-gray-200">
          Registrarse
        </a>
        <a href="/login" className="px-4 py-2 bg-gray-800 text-white font-bold rounded shadow hover:bg-gray-700">
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}
