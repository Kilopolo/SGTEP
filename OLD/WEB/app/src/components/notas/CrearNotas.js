import React, { useEffect, useState } from 'react';



function CrearNotas({ agregarNota }) {
    const [nota, setNota] = useState('');
    // const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     const getPostsFromFirebase = [];
    //     const suscriber = db.collection('notes').onSnapshot((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             getPostsFromFirebase.push({
    //                 //  id: doc.id,
    //                   ...doc.data(),
    //                   key: doc.id,
    //                  });
    //         });
    //         setPosts(getPostsFromFirebase);
    //         setLoading(false);
    //     })
    //     setLoading(true);
    //     fetch('api/notes')
    //         .then(response => response.json())
    //         .then(data => {
    //             setPosts(data);
    //             setLoading(false);
    //         })
    // }, []);



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

// const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       padding: '24px',
//       flex: 1,
//     },
//     list: {
//       listStyleType: 'none',
//       padding: 0,
//       margin: 0,
//     },
//     listItem: {
//       marginBottom: '10px',
//     },
//   };

export default CrearNotas;