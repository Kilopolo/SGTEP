import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoadingLogo from './components/LoadingLogo.js';
import { Button } from 'react-bootstrap';

const App = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/groups')
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    // return <p>Loading...</p>;
    return (
    <>
    
    <LoadingLogo></LoadingLogo>

    </>)
  }

  return (
    <div className="App">
          <Button href="#">Link</Button> 
          <Button type="submit">Button</Button>{' '}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>JUG List</h2>
          {groups.map(group =>
            <div key={group.id}>
              {group.name}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;