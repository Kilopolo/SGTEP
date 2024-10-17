import React from 'react';

function BorrarNotas({ notas, borrarNota }) {
    return (
        <div className="borrar-notas-container">
            <h2>Borrar Notas</h2>
            {notas.length === 0 ? (
                <p>No hay notas para borrar</p>
            ) : (
                <ul>
                    {notas.map((nota, index) => (
                        <li key={index}>
                            {nota} <button onClick={() => borrarNota(index)}>Borrar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BorrarNotas;
