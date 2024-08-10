// components/SideMenu.js
import React from 'react';

function SideMenu({ items = [] }) {
  if (!Array.isArray(items)) {
    return <p>Error: Items are not an array.</p>;
  }

  return (
    <div className="side-menu">
      {items.length > 0 ? (
        items.map(item => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            {/* Можно добавить дополнительную информацию о пункте бокового меню */}
          </div>
        ))
      ) : (
        <p>No side menu items available</p>
      )}
    </div>
  );
}

export default SideMenu;
