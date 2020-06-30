import React from 'react'

import App from "../containers/App";

class Home extends React.Component {

    render() {
        return (
            <App>
                <ol className="breadcrumb">
                    <h1>Principais ofertas</h1>
                </ol>
                <h2>Aéreo</h2>

                <h2>Hotéis</h2>

                <h2>Carros</h2>
            </App>
        )
    }
}

export default Home
