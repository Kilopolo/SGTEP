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
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes/create" element={<NotesCreate />} />
            <Route path="/notes/view/:id" element={<NotesViewNote />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/edit/:id" element={<NotesEdit />} />
            <Route path="/notes/delete/:id" element={<NotesDelete />} />
            <Route path="/notes/share/:id" element={<NotesShare />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
