import React from "react";
import { withRouter } from "react-router-dom";
import FlightService from "../../../app/FlightService";
import {store} from "react-notifications-component";

class FlightInfoCard extends React.Component {
    constructor(props) {
        super(props);

        this.flightService = new FlightService()
    }

    handleClick = (flightOffer) => {
        this.flightService.saveToCart(flightOffer)

        store.addNotification({
            title: 'Sucesso!',
            message: 'Adicionamos essa oferta ao carrinho',
            type: 'success',
            container: 'top-center',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000
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
                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick(this.props.flightOffer)}>Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FlightInfoCard)
