import React from "react";
import HotelInfoCard from "../../hotel/hotelInfoCard/HotelInfoCard";

class HotelHighlight extends React.Component {
    hotelOffers = () => {
        return this.props.hotelOffers.slice(0, 3)
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Hotéis</h2>
                </div>
                {this.hotelOffers().map(hotelOffer => {
                    return (
                        <HotelInfoCard hotelOffer={hotelOffer}/>
                    )
                })}
            </div>
        )
    }
}

export default HotelHighlight
