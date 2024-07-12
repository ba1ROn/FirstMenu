import React  from 'react';
import CodeMenu from './CodeMenu.json'
import './Style.css'; 

const Menu = () => {
    const menuItems = CodeMenu.menu;
    return (
        <div className='menu-container'>
            <ul className='menu'>
                {menuItems.map((el) => (
                    <li key={el.menuPos}>
                        <a href='#'>{el.menuContent}</a>
                        </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu;
