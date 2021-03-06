import React from "react";
import { withRouter } from "react-router-dom";
import FlightService from "../../../app/FlightService";
import {store} from "react-notifications-component";

class FlightSearchInfoCard extends React.Component {
    state = {
        title: ''
    }

    constructor(props) {
        super(props);

        this.flightService = new FlightService();
    }

    getTitle = (flightOffer) => {
        let title = ''

        let origin = flightOffer.itineraries[0].segments[0].departure.iataCode
        let destination = flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1].arrival.iataCode
        if (flightOffer.itineraries.length > 1) {
            title = 'Ida e volta de '
        } else {
            title = 'Somente ida de '
        }
        title += origin + ' para ' + destination

        return title
    }

    checkOneWay = () => {
        return this.props.flightOffer.itineraries.length === 1
    }

    handleClick = (flightOffer) => {
        flightOffer.numberOfPassengers = flightOffer.travelerPricings.length

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
            <div className="card text-white bg-dark mb-3">
                <div className="card-header">
                    <h3 className="card-title">
                        {this.getTitle(this.props.flightOffer)}
                    </h3>
                </div>
                <div className="card-body">
                    <h3 className="card-text">Ida</h3>
                    <div className="row">
                        <h4 className="card-text col-md-6">{this.flightService.getNumberOfStops(this.props.flightOffer.itineraries[0].segments.length - 1)}</h4>
                        <h4 className="card-text col-md-6">Duração: {this.flightService.convertDuration(this.props.flightOffer.itineraries[0].duration)}</h4>
                    </div>
                    {!this.checkOneWay() &&
                    <div>
                        <h3 className="card-text mt-2">Volta</h3>
                        <div className="row">
                            <h4 className="card-text col-md-6">{this.flightService.getNumberOfStops(this.props.flightOffer.itineraries[1].segments.length - 1)}</h4>
                            <h4 className="card-text col-md-6">Duração: {this.flightService.convertDuration(this.props.flightOffer.itineraries[1].duration)}</h4>
                        </div>
                    </div>
                    }

                    <div hidden={!this.props.flightOffer.pricingOptions.includedCheckedBagsOnly}>
                        <h3 className="card-text mt-2">Bagagem</h3>
                        <div className="row">
                            <h4 className="col-md-4" hidden={!this.props.flightOffer.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity}>Quantidade: {this.props.flightOffer.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity}</h4>
                            <h4 className="col-md-4" hidden={!this.props.flightOffer.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight}>Peso: {this.props.flightOffer.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight} {this.props.flightOffer.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weightUnit}</h4>
                        </div>
                    </div>
                    <div hidden={this.props.flightOffer.pricingOptions.includedCheckedBagsOnly}>
                        <h4 className="card-title mt-2">Bagagens não inclusas</h4>
                    </div>
                    <h4 className="card-title mt-2">Preço por adulto: U$ {this.props.flightOffer.travelerPricings[0].price.total}</h4>
                    <button type="button" className="btn btn-primary" onClick={() => this.handleClick(this.props.flightOffer)}>Adicionar ao carrinho</button>
                </div>
            </div>
        )
    }
}

export default withRouter(FlightSearchInfoCard)
