import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotesCreate from "./pages/NotesCreate";
import NotesView from "./pages/NotesView";
import { GlobalProvider } from "./context/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notes/create" element={<NotesCreate />} />
          <Route path="/notes/view" element={<NotesView />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
