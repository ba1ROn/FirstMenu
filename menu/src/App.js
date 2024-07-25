import React, { useState } from 'react';
import TopMenu from './menu';
import SideMenu from './secondMenu';
import './Style.css';

// Данные верхнего меню
const topMenuData = {
  menu: [
    { id: 1, menuContent: "Products" },
    { id: 2, menuContent: "Orders" },
    { id: 3, menuContent: "Cart" },
    { id: 4, menuContent: "OrderInfo" },
  ]
};

// Данные бокового меню
const sideMenuData = {
  sideMenu: [
    { category: "Cloths", parentId: 1 },
    { category: "Shoes", parentId: 1 },
    { category: "Kids", parentId: 1 },
    { category: "Current Orders", parentId: 2 },
    { category: "Closed Orders", parentId: 2 },
    { category: "All Orders", parentId: 2 },
    { category: "Cart", parentId: 3 },
    { category: "OrderInfo", parentId: 4 }
  ]
};

function App() {
  const [selectedMenuId, setSelectedMenuId] = useState(null); // Состояние для выбранного меню
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false); // Состояние для видимости бокового меню

  // Функция-обработчик для клика по элементу верхнего меню
  const handleMenuClick = (id) => {
    setSelectedMenuId(id); // Устанавливаем выбранный ID меню
    setIsSideMenuVisible(true); // Показываем боковое меню
  };

  // Фильтруем элементы бокового меню по выбранному ID верхнего меню
  const filteredSideMenuItems = sideMenuData.sideMenu.filter(item => item.parentId === selectedMenuId);

  return (
    <div>
      <TopMenu menuItems={topMenuData.menu} onMenuClick={handleMenuClick} />
      <SideMenu sideMenuItems={filteredSideMenuItems} isVisible={isSideMenuVisible} />
    </div>
  );
}

export default App;