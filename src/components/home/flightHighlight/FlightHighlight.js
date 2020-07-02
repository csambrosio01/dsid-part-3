import React from "react";

import './FlightHighlight.css'
import FlightInfoCard from "../../air/flightInfoCard/FlightInfoCard";

class FlightHighlight extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Aéreo</h2>
                </div>
                {this.props.flightOffers.map(flightOffer => {
                    return (
                        <FlightInfoCard flightOffer={flightOffer} />
                    )
                })}
            </div>
        )
    }
}

export default FlightHighlight
