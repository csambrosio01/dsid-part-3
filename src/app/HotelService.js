import Api from "../api/Api";

const oneDayInMillis = 24 * 60 * 60 * 1000

class HotelService {
    shuffle = (array) => {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    getHotelOffersHighlights = () => {
        let hotelOfferRequestLAX = {
            cityCode: 'LAX',
            checkInDate: new Date(Date.now() + oneDayInMillis).toISOString().split('T')[0],
            checkOutDate: new Date(Date.now() + 2 * oneDayInMillis).toISOString().split('T')[0],
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            ratings: [2,3,4,5],
            priceRange: '100-1000'
        }

        let hotelOfferRequestPAR = {
            cityCode: 'PAR',
            checkInDate: new Date(Date.now() + oneDayInMillis).toISOString().split('T')[0],
            checkOutDate: new Date(Date.now() + 2 * oneDayInMillis).toISOString().split('T')[0],
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            ratings: [2,3,4,5],
            priceRange: '100-1000'
        }

        let hotelOfferRequestSEA = {
            cityCode: 'SEA',
            checkInDate: new Date(Date.now() + oneDayInMillis).toISOString().split('T')[0],
            checkOutDate: new Date(Date.now() + 2 * oneDayInMillis).toISOString().split('T')[0],
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            ratings: [2,3,4,5],
            priceRange: '100-1000'
        }

        return new Promise(resolve => {
            Api.post('/hotel-offers', hotelOfferRequestLAX)
                .then(resultLAX => {
                    Api.post('/hotel-offers', hotelOfferRequestPAR)
                        .then(resultPAR => {
                            Api.post('/hotel-offers', hotelOfferRequestSEA)
                                .then(resultSEA => {
                                    resolve(this.shuffle(resultLAX.data.concat(resultPAR.data.concat(resultSEA.data))))
                                })
                        })
                })
        })
    }

    getHotelOffersHighlightsHotelPage = () => {
        let hotelOfferRequestNYC = {
            cityCode: 'NYC',
            checkInDate: new Date(Date.now() + oneDayInMillis).toISOString().split('T')[0],
            checkOutDate: new Date(Date.now() + 2 * oneDayInMillis).toISOString().split('T')[0],
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            ratings: [2,3,4,5],
            priceRange: '100-1000'
        }

        let hotelOfferRequestLAX = {
            cityCode: 'LAX',
            checkInDate: new Date(Date.now() + oneDayInMillis).toISOString().split('T')[0],
            checkOutDate: new Date(Date.now() + 2 * oneDayInMillis).toISOString().split('T')[0],
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            ratings: [2,3,4,5],
            priceRange: '100-1000'
        }

        let hotelOfferRequestLON = {
            cityCode: 'LON',
            checkInDate: new Date(Date.now() + oneDayInMillis).toISOString().split('T')[0],
            checkOutDate: new Date(Date.now() + 2 * oneDayInMillis).toISOString().split('T')[0],
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            ratings: [2,3,4,5],
            priceRange: '100-1000'
        }

        return new Promise(resolve => {
            Api.post('/hotel-offers', hotelOfferRequestNYC)
                .then(resultNYC => {
                    Api.post('/hotel-offers', hotelOfferRequestLAX)
                        .then(resultLAX => {
                            Api.post('/hotel-offers', hotelOfferRequestLON)
                                .then(resultLON => {
                                    resolve(this.shuffle(resultNYC.data.concat(resultLAX.data.concat(resultLON.data))))
                                })
                        })
                })
        })
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
