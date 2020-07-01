import React from "react";
import FlightService from "../../../app/FlightService";

class FlightInfoCard extends React.Component {
    constructor(props) {
        super(props);

        this.flightService = new FlightService()
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header">
                        Viaje de {this.props.flightOffer.itineraries[0].segments[0].departure.iataCode} para {this.props.flightOffer.itineraries[0].segments[0].arrival.iataCode}
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Por apenas U$ {this.props.flightOffer.price.total}</h4>
                        <h6 className="card-text">Duração do vôo: {this.flightService.convertDuration(this.props.flightOffer.itineraries[0].duration)}</h6>
                        <h6 className="card-text">{this.props.flightOffer.oneWay ? 'Apenas ida' : 'Ida e volta'}</h6>
                        <h6 className="card-text">{this.flightService.getNumberOfStops(this.props.flightOffer.itineraries[0].segments[0].numberOfStops)}</h6>
                        <button type="button" className="btn btn-primary" disabled>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightInfoCard
