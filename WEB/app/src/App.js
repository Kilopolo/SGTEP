import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from "./screens/SplashScreen.js";
import Menu from './screens/Menu';
import GestionarNotas from './components/notas/GestionarNotas';


function Pagina1() {
  return <h2>Página 1</h2>;
}

function Pagina2() {
  return <h2>Página 2</h2>;
}

function Pagina3() {
  return <h2>Página 3</h2>;
}
//pruebacommit

const App = () => {

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pagina1" element={<Pagina1 />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/pagina3" element={<Pagina3 />} />
        <Route path="/gestionarnotas" element={<GestionarNotas />} />
      </Routes>
    </Router>

    </div>
  );
};

export default App;
