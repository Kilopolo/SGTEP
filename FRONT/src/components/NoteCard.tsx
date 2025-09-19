import type { Note} from "../types";


type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onShare?: (note: Note) => void;
};

export default function NoteCard({ note, onEdit, onDelete, onShare }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
      <h3 className="font-bold text-lg">{note.title}</h3>
      <p>{note.content}</p>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(note)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Borrar
        </button>
        {onShare && (
          <button
            onClick={() => onShare(note)}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Compartir
          </button>
        )}
      </div>
    </div>
  );
}
