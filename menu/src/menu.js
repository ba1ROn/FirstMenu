import React from 'react';
import './Style.css';


function TopMenu({ menuItems, onMenuClick }) {
    return(
        <div className='TopMenu'>
            <ul>
                {menuItems.map(el => (
                    <li onClick={() => onMenuClick(el.id)}>
                        {el.menuContent}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default TopMenu;
