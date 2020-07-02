import React from "react";
import StringUtils from "../../../utils/StringUtils";

class HotelInfoCard extends React.Component {
    constructor(props) {
        super(props);

        this.stringUtils = new StringUtils()
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

    render() {
        return (
            <div className="col-md-4">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header card-header-height">
                        <h5 className="card-text">
                            {this.stringUtils.capitalize(this.props.hotelOffer.hotel.name)}
                        </h5>
                    </div>
                    <div className="card-header">
                        <h4 className="card-text">Local</h4>
                        <h5 className="card-text">{this.props.hotelOffer.hotel.address.lines.map(line => {
                            return (this.stringUtils.capitalize(line))
                        })}</h5>
                        <h5 className="card-text">{this.stringUtils.capitalize(this.props.hotelOffer.hotel.address.cityName)}, {this.props.hotelOffer.hotel.address.countryCode}</h5>
                    </div>
                    <div className="card-header">
                        <h5 className="card-text">Avaliação: {this.getRating().map(() => {
                            return (
                                <i className="fas fa-star star"/>
                            )
                        })}
                        </h5>
                    </div>
                    <div className="card-body">
                        <h5 className="card-text mb-2">Preço total: U$ {this.props.hotelOffer.offers[0].price.total}</h5>
                        <button type="button" className="btn btn-primary" disabled>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotelInfoCard
