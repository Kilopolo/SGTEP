import React from 'react';

function WebListComponent({ isLoading, data }) {
  return (
    <div style={styles.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles.list}>
          {data.map((item) => (
            <li key={item.id} style={styles.listItem}>
                          <strong>Nombre:</strong> {item.name} <br />
                          <strong>Email:</strong> {item.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    flex: 1,
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
};

export default WebListComponent;
