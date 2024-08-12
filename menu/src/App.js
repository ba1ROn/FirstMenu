import React, { useState, useEffect } from 'react';
import './Style.css';  // Импортируйте CSS файл

const App = () => {
  const [topMenuItems, setTopMenuItems] = useState([]);
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Загрузка данных верхнего меню
  useEffect(() => {
    fetch('http://localhost:5000/api/Menu/mainmenu')
      .then(response => response.json())
      .then(data => setTopMenuItems(data))
      .catch(error => console.error('Error fetching top menu items:', error));
  }, []);

  // Загрузка данных бокового меню при изменении selectedId
  useEffect(() => {
    if (selectedId === null) return;

    fetch('http://localhost:5000/api/Menu/getSubMenu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parentID: selectedId }) // Отправляем ID в теле запроса
    })
      .then(response => response.json())
      .then(data => setSideMenuItems(data))
      .catch(error => console.error('Error fetching side menu items:', error));
  }, [selectedId]);

  return (
    <div>
      <div className="top-menu">
        {topMenuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            title={item.description}  // Всплывающая подсказка
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="side-menu">
        {sideMenuItems.map(item => (
          <div key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
