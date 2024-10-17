import React from 'react';

function CompartirNotas({ notas }) {
    const compartirNota = (nota) => {
        const shareData = {
            title: 'Mi Nota',
            text: nota,
        };

        if (navigator.share) {
            navigator.share(shareData).catch((error) => console.error('Error al compartir:', error));
        } else {
            alert('La funcionalidad de compartir no es compatible con tu navegador.');
        }
    };

    return (
        <div className="compartir-notas-container">
            <h2>Compartir Notas</h2>
            {notas.length === 0 ? (
                <p>No hay notas para compartir</p>
            ) : (
                <ul>
                    {notas.map((nota, index) => (
                        <li key={index}>
                            {nota} <button onClick={() => compartirNota(nota)}>Compartir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CompartirNotas;
