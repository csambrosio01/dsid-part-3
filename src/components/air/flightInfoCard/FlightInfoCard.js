import React from "react";
import moment from "moment";

class FlightInfoCard extends React.Component {
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
            <div className="col-md-4">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header">
                        Viaje de {this.props.flightOffer.itineraries[0].segments[0].departure.iataCode} para {this.props.flightOffer.itineraries[0].segments[0].arrival.iataCode}
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Por apenas U$ {this.props.flightOffer.price.total}</h4>
                        <h6 className="card-text">Duração do vôo: {this.convertDuration(this.props.flightOffer.itineraries[0].duration)}</h6>
                        <h6 className="card-text">{this.props.flightOffer.oneWay ? 'Apenas ida' : 'Ida e volta'}</h6>
                        <h6 className="card-text">{this.getNumberOfStops(this.props.flightOffer.itineraries[0].segments[0].numberOfStops)}</h6>
                        <button type="button" className="btn btn-primary" disabled>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightInfoCard
