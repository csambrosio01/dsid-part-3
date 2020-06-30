import React from "react";
import Loader from "react-loader-spinner";
import moment from "moment";

import FlightService from "../../../app/FlightService";

import './FlightHighlight.css'

class FlightHighlight extends React.Component {
    state = {
        flightOffers: [],
        isFlightOffersLoading: false
    }

    constructor(props) {
        super(props);
        this.flightService = new FlightService();
    }

    componentDidMount() {
        this.getFlightOffersHighlights()
    }

    getFlightOffersHighlights = () => {
        this.setState({isFlightOffersLoading: true})
        this.flightService.getFlightOffersHighlights()
            .then(response => {
                this.setState({
                    flightOffers: response.data,
                    isFlightOffersLoading: false
                })
            })
            .catch(() => {
                this.setState({isFlightOffersLoading: false})
            })
    }

    timeConversion = (duration) => {
        const portions = [];

        const days = duration.days()
        let milliseconds = duration.asMilliseconds()

        if (days > 0) {
            days === 1 ? portions.push(days + ' dia') : portions.push(days + ' dias')
        }

        const msInHour = 1000 * 60 * 60;
        const hours = Math.trunc(milliseconds / msInHour);
        if (hours > 0) {
            portions.push(hours + 'h');
            milliseconds = milliseconds - (hours * msInHour);
        }

        const msInMinute = 1000 * 60;
        const minutes = Math.trunc(milliseconds / msInMinute);
        if (minutes > 0) {
            portions.push(minutes + 'm');
            milliseconds = milliseconds - (minutes * msInMinute);
        }

        const seconds = Math.trunc(milliseconds / 1000);
        if (seconds > 0) {
            portions.push(seconds + 's');
        }

        return portions.join(' ');
    }

    convertDuration = (duration) => {
        const durationConverted = moment.duration(duration)
        return this.timeConversion(durationConverted)
    }

    getNumberOfStops = (numberOfStops) => {
        let string = ''
        switch (numberOfStops) {
            case 0:
                string = 'Vôo direto'
                break;
            case 1:
                string = '1 parada'
                break;
            default:
                string = numberOfStops + ' paradas'
                break;
        }
        return string
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Aéreo</h2>
                </div>
                {!this.state.isFlightOffersLoading &&
                this.state.flightOffers.map(flightOffer => {
                    return (
                        <div className="col-md-4">
                            <div className="card text-white bg-dark mb-3">
                                <div className="card-header">Viaje de {flightOffer.itineraries[0].segments[0].departure.iataCode} para {flightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
                                <div className="card-body">
                                    <h4 className="card-title">Por apenas U$ {flightOffer.price.total}</h4>
                                    <h6 className="card-text">Duração do vôo: {this.convertDuration(flightOffer.itineraries[0].duration)}</h6>
                                    <h6 className="card-text">{flightOffer.oneWay ? 'Apenas ida' : 'Ida e volta'}</h6>
                                    <h6 className="card-text">{this.getNumberOfStops(flightOffer.itineraries[0].segments[0].numberOfStops)}</h6>
                                    <button type="button" className="btn btn-primary">Comprar</button>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
                {this.state.isFlightOffersLoading &&
                <div className="col-md-12 d-flex justify-content-center">
                    <Loader type="Oval" color="Blue" height={100} width={100}/>
                </div>
                }
            </div>
        )
    }
}

export default FlightHighlight
