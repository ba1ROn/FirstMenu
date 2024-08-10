// App.js
import React, { useState, useEffect } from 'react';
import TopMenu from './menu';
import SideMenu from './secondMenu';

// Функция для получения данных верхнего меню
async function fetchTopMenu() {
  try {
    const response = await fetch('http://localhost:5000/api/Menu/mainmenu');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch top menu data:', error);
    return [];
  }
}

// Функция для получения данных бокового меню
async function fetchSideMenu(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/Menu/getSubMenu?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch side menu data:', error);
    return [];
  }
}

function App() {
  const [topMenu, setTopMenu] = useState([]);
  const [sideMenu, setSideMenu] = useState([]);

  useEffect(() => {
    fetchTopMenu().then(data => setTopMenu(data));
  }, []);

  const handleTopMenuClick = async (id) => {
    const data = await fetchSideMenu(id);
    setSideMenu(data);
  };

  return (
    <div className="app">
      <TopMenu items={topMenu} onClick={handleTopMenuClick} />
      <SideMenu items={sideMenu} />
    </div>
  );
}

export default App;
