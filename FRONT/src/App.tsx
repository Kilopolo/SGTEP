import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotesCreate from "./pages/notes/NotesCreate";
import NotesViewNote from "./pages/notes/NotesViewNote";
import NotesEdit from "./pages/notes/NotesEdit";
import NotesList from "./pages/notes/NotesList";
import NotesDelete from "./pages/notes/NotesDelete";
import NotesShare from "./pages/notes/NotesShare";
import { GlobalProvider } from "./context/GlobalProvider";
import LoadingScreen from "./components/loadingScreen/LoadingScreen";
import { useBackendStatus } from "./hooks/useBackendStatus";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { loading } = useBackendStatus(API_URL);

  if (loading) {
    console.log("Cargando...");
    return <LoadingScreen {...{ isLoading: loading }} />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <GlobalProvider>
        <Router>
          <Header />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Landing />} />

            {/* Rutas protegidas */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notes/create"
              element={
                <ProtectedRoute>
                  <NotesCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/view/:id"
              element={
                <ProtectedRoute>
                  <NotesViewNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/edit/:id"
              element={
                <ProtectedRoute>
                  <NotesEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/delete/:id"
              element={
                <ProtectedRoute>
                  <NotesDelete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/share/:id"
              element={
                <ProtectedRoute>
                  <NotesShare />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
