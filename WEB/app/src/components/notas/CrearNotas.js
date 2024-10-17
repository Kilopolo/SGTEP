import React, { useState } from 'react';

function CrearNotas({ agregarNota }) {
    const [nota, setNota] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nota.trim()) {
            agregarNota(nota);
            setNota(''); // Resetea el campo
        }
    };

    return (
        <div className="crear-notas-container">
            <h2>Crear Nueva Nota</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Escribe tu nota aquí..."
                    required
                />
                <button type="submit">Agregar Nota</button>
            </form>
        </div>
    );
}

export default CrearNotas;