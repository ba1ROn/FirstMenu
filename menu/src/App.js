import React, { useState, useEffect } from 'react';
import './Style.css';  

const App = () => {
  const [topMenuItems, setTopMenuItems] = useState([]);
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
    fetch('http://localhost:5000/api/Menu/mainmenu')
      .then(response => response.json())
      .then(data => {setTopMenuItems(data)})},[]);


  const handleTopMenuClick = (id) => {
    setSelectedId(id); 

    fetch('http://localhost:5000/api/Menu/getSubMenu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ id: id }) 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => { setSideMenuItems(data)})
  };

  return (
    <div className="container">
      <div className="top-menu">
        {topMenuItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleTopMenuClick(item.id)}
            title={item.description}>
            {item.name}
          </button>
        ))}
      </div>
      <div className={`side-menu ${selectedId ? 'visible' : ''}`}>
  {sideMenuItems.map(item => (
    <button
      key={item.id}
      title={item.description}
    >
      {item.title}
    </button>
  ))}
    </div>
    </div>
  );
};

export default App;
