// src/App.js
import React, { useState, useEffect } from 'react';
import './Style.css'; // Импорт стилей

const App = () => {
  const [topMenuData, setTopMenuData] = useState([]);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных для верхнего меню
  useEffect(() => {
    const fetchTopMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Menu/mainmenu');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setTopMenuData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMenuData();
  }, []);

  // Обработка клика по элементу верхнего меню
  const handleMenuClick = async (parentId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/Menu/getSubMenu?parentID=${parentId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setSideMenuData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="menu">
        {topMenuData.map((item) => (
          <button
            key={item.id} // Убедитесь, что `id` уникален
            className="menu-button"
            onClick={() => handleMenuClick(item.id)} // Передаем id в обработчик
          >
            {item.name} {/* Предполагается, что у каждого объекта есть свойство `name` */}
          </button>
        ))}
      </div>
      <div className="side-menu">
        <ul>
          {sideMenuData.map((item) => (
            <li key={item.id}>{item.name}</li> // Предполагается, что у каждого объекта есть свойство `name`
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
