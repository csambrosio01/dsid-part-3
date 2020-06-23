import React from 'react'

import logo from '../../images/logo.PNG'

import Menu from '../menu'

import './Header.css'

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
            <span>
                <img src={logo} className="app-header-logo" alt="Imagem do Logo da empresa Pousar.com"/>
            </span>
        </a>
        <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor02"
                aria-controls="navbarColor02"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>

        <Menu/>
    </nav>
)

export default Header
