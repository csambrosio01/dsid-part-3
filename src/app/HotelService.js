import Api from "../api/Api";

class HotelService {
    getHotelOffersHighlights = () => {
        return Api.get('/hotel-offers/highlights')
    }

    getHotelOffers = (searchObject) => {
        let ratings = []
        let i
        if (searchObject.rating === 5) {
            i = 2
        } else {
            i = 1
        }
        for (; i <= searchObject.rating; i++) {
            ratings.push(i)
        }

        let priceRange = searchObject.priceRange.min.toString() + '-' + searchObject.priceRange.max.toString()

        let hotelRequest = {
            cityCode: searchObject.cityCode,
            checkInDate: searchObject.checkInDate.toISOString().split('T')[0],
            checkOutDate: searchObject.checkOutDate.toISOString().split('T')[0],
            roomQuantity: searchObject.roomQuantity,
            adults: searchObject.adults,
            radius: 20,
            ratings: ratings,
            priceRange: priceRange
        }

        return Api.post('/hotel-offers', hotelRequest)
    }
}

export default HotelService
