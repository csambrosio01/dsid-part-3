import Api from "../api/Api";

class FlightService {
    getFlightOffersHighlights = () => {
        return Api.get('/flight-offers/highlights')
    }
}

export default FlightService;
