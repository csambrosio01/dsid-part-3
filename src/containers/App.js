import React from 'react'

import Container from '../components/container'
import Footer from '../components/footer'
import Header from '../components/header'

const App = ({children}) => (
    <>
        <Header/>
        <Container>
            {children}
        </Container>
        <Footer/>
    </>
)

export default App
