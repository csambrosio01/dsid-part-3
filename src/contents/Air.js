import React from 'react'

import App from "../containers/App";
import FlightSearchCard from "../components/air/flightSearchCard/FlightSearchCard";

class Air extends React.Component {
    render() {
        return (
            <App>
                <div className="jumbotron">
                    <h1 className="display-3">Aéreo</h1>

                    <p className="lead">Encontre aqui as melhores ofertas de passagens para a sua viagem.</p>

                    <hr className="my-4"/>

                    <FlightSearchCard/>
                </div>
            </App>
        )
    }
}

export default Air
