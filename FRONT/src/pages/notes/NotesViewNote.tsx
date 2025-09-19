// Simulación de notas guardadas
const notes = [
  { id: 1, title: "Reunión equipo", content: "Definir roadmap del proyecto" },
  { id: 2, title: "Idea app", content: "Explorar integración con Google Calendar" },
];

export default function NotesView() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Notas Guardadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 className="text-lg font-bold">{note.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
