import Header from "./components/Header";
import { MyComponent } from "./components/MyComponent";
import { GlobalProvider } from "./context/GlobalProvider";
function App() {
  return (
    <GlobalProvider>
      {" "}
      <div className="bg-red-500 text-white p-4">
        Si ves rojo, Tailwind funciona
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div>
          <Header />
          <MyComponent />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
