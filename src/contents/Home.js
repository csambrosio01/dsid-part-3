import React from 'react'

import App from "../containers/App";
import FlightHighlight from "../components/home/flightHighlight/FlightHighlight";

class Home extends React.Component {

    render() {
        return (
            <App>
                <ol className="breadcrumb">
                    <h1>Principais ofertas</h1>
                </ol>

                <FlightHighlight/>

                <h2>Hotéis</h2>

                <h2>Carros</h2>
            </App>
        )
    }
}

export default Home
