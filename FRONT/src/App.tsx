import Header from "./components/Header";
import { MyComponent } from "./components/MyComponent";
import { GlobalProvider } from "./context/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <div className="bg-red-500 text-white p-4">
        Si ves rojo, Tailwind funciona
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-gray-900 dark:to-gray-700">
        <Header />
        <MyComponent />
        <p className="mt-6">
          🌞 Claro / 🌙 Oscuro funcionando con Tailwind
        </p>
      </div>
    </GlobalProvider>
  );
}

export default App;
