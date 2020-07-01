import Api from "../api/Api";

class AirportService {
    searchCityOrAirport = (airportOrCity) => {
        return Api.get('/search?airportOrCity=' + airportOrCity)
    }
}

export default AirportService;
