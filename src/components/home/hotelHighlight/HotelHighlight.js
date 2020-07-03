import React from "react";
import HotelInfoCard from "../../hotel/hotelInfoCard/HotelInfoCard";

class HotelHighlight extends React.Component {
    hotelOffers = () => {
        return this.props.hotelOffers.slice(0, 3)
    }

    render() {
        return (
            <React.Fragment>
                <h2>Hotéis</h2>
                <div className="row">
                    {this.hotelOffers().map(hotelOffer => {
                        return (
                            <HotelInfoCard hotelOffer={hotelOffer}/>
                        )
                    })}
                </div>
                {this.hotelOffers().length === 0 &&
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Essa não!</h4>
                    <p>Não conseguimos encontrar nenhuma oferta especial de hotéis no momento, por favor, tente novamente mais
                        tarde</p>
                </div>
                }
            </React.Fragment>
        )
    }
}

export default HotelHighlight
