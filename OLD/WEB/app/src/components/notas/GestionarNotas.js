import React, { useState } from 'react';
import CrearNotas from './CrearNotas';
import VerNotas from './VerNotas';
import EditarNotas from './EditarNotas';
import BorrarNotas from './BorrarNotas';
import CompartirNotas from './CompartirNotas';

function GestionarNotas() {
    const [notas, setNotas] = useState([]);

    const agregarNota = (nuevaNota) => {
        setNotas([...notas, nuevaNota]);
    };

    const editarNota = (index, notaEditada) => {
        const nuevasNotas = [...notas];
        nuevasNotas[index] = notaEditada;
        setNotas(nuevasNotas);
    };

    const borrarNota = (index) => {
        const nuevasNotas = notas.filter((_, i) => i !== index);
        setNotas(nuevasNotas);
    };

    return (
        <div className="app-container">
            <CrearNotas agregarNota={agregarNota} />
            <VerNotas notas={notas} />
            <EditarNotas notas={notas} editarNota={editarNota} />
            <BorrarNotas notas={notas} borrarNota={borrarNota} />
            <CompartirNotas notas={notas} />
        </div>
    );
}

export default GestionarNotas;
