// LoadingScreen.tsx

import DinoGame from "./DinoGame.tsx";

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null; // cuando isLoading = false, DinoGame se desmonta del DOM
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div id="main-frame-error" className="interstitial-wrapper">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Conectando con el servidor...</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Mientras esperas, juega un rato 🦖
          </p>
        </div>
        <div className="w-[800px] h-[200px] mx-auto border">
          <DinoGame />
        </div>
      </div>
    </div>
  );
}
