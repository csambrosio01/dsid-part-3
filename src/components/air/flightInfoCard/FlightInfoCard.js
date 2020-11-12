import React from "react";
import { withRouter } from "react-router-dom";
import FlightService from "../../../app/FlightService";

class FlightInfoCard extends React.Component {
    constructor(props) {
        super(props);

        this.flightService = new FlightService()
    }

    handleClick(flightOffer) {
        this.flightService.shouldRedirectToBuyPage(flightOffer)
            .then(response => {
                if (response) {
                    this.props.history.push({
                        pathname: '/air-buy',
                        flightOffer: flightOffer
                    })
                } else {
                    this.props.history.push({
                        pathname: '/login',
                        search: `navto=/air-buy`,
                        flightOffer: flightOffer
                    })
                }
            })
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header">
                        <h5 className="card-text">
                            Viaje de {this.props.flightOffer.itineraries[0].segments[0].departure.iataCode} para {this.props.flightOffer.itineraries[0].segments[0].arrival.iataCode}
                        </h5>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Por apenas U$ {this.props.flightOffer.price.total}</h4>
                        <h5 className="card-text">Duração do vôo: {this.flightService.convertDuration(this.props.flightOffer.itineraries[0].duration)}</h5>
                        <h5 className="card-text">{this.props.flightOffer.oneWay ? 'Apenas ida' : 'Ida e volta'}</h5>
                        <h5 className="card-text">{this.flightService.getNumberOfStops(this.props.flightOffer.itineraries[0].segments[0].numberOfStops)}</h5>
                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick(this.props.flightOffer)}>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FlightInfoCard)
