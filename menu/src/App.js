import React, { useState, useEffect } from 'react';
import './Style.css';  // Импортируйте CSS файл

const App = () => {
  const [topMenuItems, setTopMenuItems] = useState([]);
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Функция для загрузки данных верхнего меню
  useEffect(() => {
    fetch('http://localhost:5000/api/Menu/mainmenu')
      .then(response => response.json())
      .then(data => setTopMenuItems(data))}, []);

  // Функция для обработки кликов по верхнему меню
  const handleTopMenuClick = (id) => {
    setSelectedId(id); // Установите выбранный ID

    fetch('http://localhost:5000/api/Menu/getSubMenu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify({ parentID: id }) // Отправляем данные в теле запроса
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setSideMenuItems(data)) };

  return (
    <div>
      <div className="top-menu">
        {topMenuItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleTopMenuClick(item.id)}
            title={item.description}  // Добавьте описание как всплывающую подсказку
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
