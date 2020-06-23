import React from 'react'
import {Link} from 'react-router-dom'

import './Menu.css'

const Menu = () => (
    <nav class="app-menu">
        <ul className="app-menu-list">
            <li className="app-menu-item">
                <Link className="app-menu-link" to="/">
                    Home
                </Link>
            </li>
            <li className="app-menu-item">
                <Link className="app-menu-link" to="/air">
                    Aéreo
                </Link>
            </li>
            <li className="app-menu-item">
                <Link className="app-menu-link" to="/hotel">
                    Hotéis
                </Link>
            </li>
            <li className="app-menu-item">
                <Link className="app-menu-link" to="/car-rental">
                    Aluguel de carros
                </Link>
            </li>
        </ul>
    </nav>
)

export default Menu
