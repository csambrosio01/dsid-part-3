import React from 'react'

import logo from '../../images/logo.PNG'

import Menu from '../menu'

import './Header.css'

const Header = () => (
    <header className="app-header">
        <span>
            <img src={logo} className="app-header-logo" alt="Imagem do Logo da empresa Pousar.com"/>
        </span>
        <Menu/>
    </header>
)

export default Header
