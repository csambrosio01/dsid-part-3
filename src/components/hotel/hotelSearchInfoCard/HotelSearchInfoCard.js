import React from "react";
import StringUtils from "../../../utils/StringUtils";
import {store} from "react-notifications-component";
import HotelService from "../../../app/HotelService";

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',]
const oneDayInMillis = 24 * 60 * 60 * 1000

class HotelSearchInfoCard extends React.Component {
    constructor(props) {
        super(props);

        this.stringUtils = new StringUtils()
        this.hotelService = new HotelService()
    }

    getRating = () => {
        let rating = parseInt(this.props.hotelOffer.hotel.rating)
        let aux = []
        let i;
        for (i = 0; i < rating; i++) {
            aux.push(i)
        }
        return aux
    }

    getAddress = () => {
        let address = this.props.hotelOffer.hotel.address
        let addressString = ''

        address.lines.forEach(line => {
            addressString += this.stringUtils.capitalize(line) + ' '
        })
        addressString.trim()
        addressString += ', ' + this.stringUtils.capitalize(address.cityName)
        addressString += (address.stateCode !== undefined) ? ', ' + address.stateCode : ''
        addressString += ', ' + address.countryCode

        return addressString
    }

    getDate = (fieldName) => {
        let date = this.props.hotelOffer.offers[0][fieldName].split('-')
        let month = months[parseInt(date[1]) - 1]
        return date[2] + ' de ' + month + ' de ' + date[0]
    }

    getDays = () => {
        let dateIn = new Date(this.props.hotelOffer.offers[0].checkInDate)
        let dateOut = new Date(this.props.hotelOffer.offers[0].checkOutDate)
        return Math.abs(dateOut - dateIn) / oneDayInMillis
    }

    handleClick = (hotelOffers) => {
        this.hotelService.saveToCart(hotelOffers)

        store.addNotification({
            title: 'Sucesso!',
            message: 'Adicionamos essa oferta ao carrinho',
            type: 'success',
            container: 'top-center',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000
            }
        })
    }

    render() {
        const hotel = this.props.hotelOffer.hotel
        const offer = this.props.hotelOffer.offers[0]
        return (
            <div className="card text-white bg-dark mb-3">
                <div className="card-header">
                    <h3 className="card-title">
                        {this.stringUtils.capitalize(this.props.hotelOffer.hotel.name)}
                    </h3>
                </div>
                <div className="card-header">
                    <h3 className="card-text">Informações básicas:</h3>
                    <h4 className="card-text">{this.getAddress()}</h4>
                    <h4 className="card-text">
                        Distância do centro: {hotel.hotelDistance.distance} {hotel.hotelDistance.distanceUnit}
                    </h4>
                    <h4 className="card-text">Avaliação: {this.getRating().map(() => {
                        return (
                            <i className="fas fa-star star"/>)
                    })}
                    </h4>
                </div>
                <div className="card-body">
                    <h3 className="card-text">
                        Data de entrada: {this.getDate('checkInDate')}, a partir das 16h00.
                    </h3>
                    <h3 className="card-text">
                        Data de saída: {this.getDate('checkOutDate')}, até às 12h00.
                    </h3>
                    {(this.getDays() > 1) &&
                    <h3 className="card-text">
                        Preço total das {this.getDays()} diárias: US$ {offer.price.total}
                    </h3>
                    }
                    {(this.getDays() === 1) &&
                    <h3 className="card-text">
                        Preço da diária: US$ {offer.price.total}
                    </h3>
                    }
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => this.handleClick(this.props.hotelOffer)}>Adicionar ao carrinho</button>
                </div>
            </div>
        )
    }
}

export default HotelSearchInfoCard
