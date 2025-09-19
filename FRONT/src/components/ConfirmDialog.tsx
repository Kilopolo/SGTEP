
type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <p>{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
