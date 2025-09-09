import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menú Principal</h1>
      <div style={styles.buttonContainer}>
      <button style={styles.button} onClick={() => navigate('/')}>
          Ir a SplashScreen
        </button>
        <button style={styles.button} onClick={() => navigate('/gestionarnotas')}>
          Ir a GestionarNotas
        </button>
        <button style={styles.button} onClick={() => navigate('/pagina1')}>
          Página 1
        </button>
        <button style={styles.button} onClick={() => navigate('/pagina2')}>
          Página 2
        </button>
        <button style={styles.button} onClick={() => navigate('/pagina3')}>
          Página 3
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
  },
};