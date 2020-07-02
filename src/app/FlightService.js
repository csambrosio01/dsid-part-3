import Api from "../api/Api";
import moment from "moment";

class FlightService {
    getFlightOffers = (searchObject) => {

        let flight = {
            originLocationCode: searchObject.origin,
            destinationLocationCode: searchObject.destination,
            departureDate: searchObject.departureDate.toISOString().split('T')[0],
            adults: searchObject.passenger,
            travelClass: searchObject.travelClass,
            oneWay: searchObject.oneWay,
            max: 9
        }

        if (!searchObject.oneWay) {
            flight.returnDate = searchObject.returnDate.toISOString().split('T')[0]
        }

        return Api.post('/flight-offers', flight)
    }

    getFlightOffersHighlights = () => {
        return Api.get('/flight-offers/highlights')
    }

    getFlightOffersHighlightsAirPage = () => {
        return Api.get('/flight-offers/air/highlights')
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
}

export default FlightService;
