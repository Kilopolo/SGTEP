import React, { useState } from 'react';

function EditarNotas({ notas, editarNota }) {
    const [notaSeleccionada, setNotaSeleccionada] = useState(null);
    const [notaEditada, setNotaEditada] = useState('');

    const handleEditar = (index) => {
        setNotaSeleccionada(index);
        setNotaEditada(notas[index]);
    };

    const handleGuardar = () => {
        if (notaEditada.trim()) {
            editarNota(notaSeleccionada, notaEditada);
            setNotaSeleccionada(null); // Termina la edición
        }
    };

    return (
        <div className="editar-notas-container">
            <h2>Editar Notas</h2>
            {notas.length === 0 ? (
                <p>No hay notas para editar</p>
            ) : (
                <ul>
                    {notas.map((nota, index) => (
                        <li key={index}>
                            {notaSeleccionada === index ? (
                                <div>
                                    <textarea
                                        value={notaEditada}
                                        onChange={(e) => setNotaEditada(e.target.value)}
                                    />
                                    <button onClick={handleGuardar}>Guardar</button>
                                </div>
                            ) : (
                                <div>
                                    {nota} <button onClick={() => handleEditar(index)}>Editar</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EditarNotas;
