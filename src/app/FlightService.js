import Api from "../api/Api";

class FlightService {
    getFlightOffersHighlights = () => {
        return Api.get('/flight-offers/highlights')
    }

    getFlightOffersHighlightsAirPage = () => {
        return Api.get('/flight-offers/air/highlights')
    }
}

export default FlightService;
