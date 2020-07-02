import Api from "../api/Api";

class HotelService {
    getHotelOffersHighlights = () => {
        return Api.get('/hotel-offers/highlights')
    }
}

export default HotelService
