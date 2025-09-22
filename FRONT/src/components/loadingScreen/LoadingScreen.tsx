

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div id="main-frame-error" className="interstitial-wrapper">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Conectando con el servidor...</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Mientras esperas, juega un rato 🦖
          </p>
        </div>
        <script type="module" src="/src/DinoGame.ts"></script>
      </div>
    </div>
  );
}
