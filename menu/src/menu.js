// components/TopMenu.js
import React from 'react';

function TopMenu({ items = [], onClick }) {
  if (!Array.isArray(items)) {
    return <p>Error: Items are not an array.</p>;
  }

  return (
    <div className="top-menu">
      {items.length > 0 ? (
        items.map(item => (
          <button key={item.id} onClick={() => onClick(item.id)}>
            {item.name}
          </button>
        ))
      ) : (
        <p>No menu items available</p>
      )}
    </div>
  );
}

export default TopMenu;
