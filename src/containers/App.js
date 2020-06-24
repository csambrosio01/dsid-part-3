import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

const App = ({children}) => (
    <>
        <Header/>
        <div className="container">
            {children}
        </div>
        <Footer/>
    </>
)

export default App
