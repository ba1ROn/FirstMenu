import React from 'react';
import './Style.css';


function SideMenu({ sideMenuItems, isVisible }) {
    const style = isVisible ? "SideMenu visible" : "SideMenu";
        return(
            <div className={style}>
                <ul>
                    {sideMenuItems.map(el=>(
                        <li>
                            {el.category}
                        </li>
                    ))}
                </ul>
            </div>
        )
}

export default SideMenu;
