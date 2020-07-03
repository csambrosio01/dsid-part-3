import React from "react";

import './FlightHighlight.css'
import FlightInfoCard from "../../air/flightInfoCard/FlightInfoCard";

class FlightHighlight extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h2>Aéreo</h2>
                <div className="row">
                    {this.props.flightOffers.map(flightOffer => {
                        return (
                            <FlightInfoCard flightOffer={flightOffer} />
                        )
                    })}
                </div>
                {this.props.flightOffers.length === 0 &&
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Essa não!</h4>
                    <p>Não conseguimos encontrar nenhuma oferta especial de passagens aéreas no momento, por favor, tente novamente mais
                        tarde</p>
                </div>
                }
            </React.Fragment>

        )
    }
}

export default FlightHighlight
