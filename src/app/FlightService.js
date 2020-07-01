import Api from "../api/Api";

class FlightService {
    getFlightOrders = (searchObject) => {

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
}

export default FlightService;
