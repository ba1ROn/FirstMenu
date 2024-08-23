import React, { useState, useEffect } from 'react';
import './Style.css';

const App = () => {
  const [topMenuItems, setTopMenuItems] = useState([]);
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [activeButtonId, setActiveButtonId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/Menu/mainmenu')
      .then(response => response.json())
      .then(data => setTopMenuItems(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.top-menu') && !event.target.closest('.side-menu')) {
        setActiveButtonId(null);
        setSideMenuItems([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTopMenuClick = (id) => {
    if (activeButtonId === id) {
      setActiveButtonId(null);
      setSideMenuItems([]);
    } else {
      setActiveButtonId(id);
      fetch('http://localhost:5000/api/Menu/getSubMenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id })
      })
        .then(response => response.json())
        .then(data => setSideMenuItems(data));
    }
  };

  return (
    <div className="container">
      <div className="top-menu">
        {topMenuItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleTopMenuClick(item.id)}
            className={activeButtonId === item.id ? 'active' : ''}
            title={item.description}>
            {item.name}
          </button>
        ))}
      </div>
      <div className={`side-menu ${activeButtonId ? 'visible' : ''}`}>
        {sideMenuItems.map(item => (
          <button
            key={item.id}
            title={item.description}>
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
