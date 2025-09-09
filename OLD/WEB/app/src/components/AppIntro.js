import React, { useEffect, useState } from 'react';
import logo from '../img/logo.svg';
import '../stylesheets/App.css';
import LoadingLogo from '../components/LoadingLogo.js';

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
    console.log('api/groups');
    if (loading) {
      return (
      <div>
        <LoadingLogo></LoadingLogo>
      </div>)
    }
  
  return (
    <div className="App">
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