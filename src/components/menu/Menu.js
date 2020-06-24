import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => (
    <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/air">
                    Aéreo
                </Link>
            </li>

            <li className="nav-item active">
                <Link className="nav-link" to="/hotel">
                    Hotéis
                </Link>
            </li>

            <li className="nav-item active">
                <Link className="nav-link" to="/car-rental">
                    Aluguel de carros
                </Link>
            </li>
        </ul>
    </div>
)

export default Menu