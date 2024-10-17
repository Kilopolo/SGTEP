import React from 'react';

function VerNotas({ notas }) {
    return (
        <div className="ver-notas-container">
            <h2>Notas</h2>
            {notas.length === 0 ? (
                <p>No hay notas disponibles</p>
            ) : (
                <ul>
                    {notas.map((nota, index) => (
                        <li key={index}>{nota}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default VerNotas;
