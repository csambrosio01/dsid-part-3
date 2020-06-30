import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

const App = ({children}) => (
    <>
        <Header/>
        <div className="container min-vh-80">
            {children}
        </div>
        <Footer/>
    </>
)

export default App
