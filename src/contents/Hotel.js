import React from 'react'

import App from "../containers/App";
import HotelSearchCard from "../components/hotel/hotelSearchCard/HotelSearchCard";
import HotelService from "../app/HotelService";
import Loader from "react-loader-spinner";
import HotelSearchInfoCard from "../components/hotel/hotelSearchInfoCard/HotelSearchInfoCard";

class Hotel extends React.Component {
    state = {
        hotelSearchOffers: [],
        isHotelSearchOffersLoading: false,
        hasSearched: false
    }

    constructor(props) {
        super(props);
        this.hotelService = new HotelService();
    }

    onSearchClicked = (searchObject) => {
        this.setState({
            hasSearched: true,
            isHotelSearchOffersLoading: true
        })

        this.hotelService.getHotelOffers(searchObject)
            .then(response => {
                this.setState({
                    hotelSearchOffers: response.data.slice(0,9),
                    isHotelSearchOffersLoading: false
                })
            })
            .catch(() => {
                this.setState({isHotelSearchOffersLoading: false})
            })
    }

    render() {
        return (
            <App>
                <div className="jumbotron">
                    <h1 className="display-3">Hotel</h1>

                    <p className="lead">Aqui você pode encontrar e buscar pelas melhores ofertas de hotéis para a sua
                        viagem.</p>

                    <hr className="my-4"/>

                    <HotelSearchCard onSearchClicked={this.onSearchClicked}/>
                </div>
                {this.state.hasSearched &&
                <div>
                    {!this.state.isHotelSearchOffersLoading &&
                    <div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h2>Sua busca</h2>
                            </div>
                        </div>
                        {this.state.hotelSearchOffers.map(hotelOffer => {
                            return (
                                <HotelSearchInfoCard hotelOffer={hotelOffer}/>
                            )
                        })}
                    </div>
                    }
                    {(this.state.hasSearched && this.state.isHotelSearchOffersLoading) &&
                    <div className="col-md-12 d-flex justify-content-center mb-5">
                        <Loader type="Oval" color="Blue" height={100} width={100}/>
                    </div>
                    }
                </div>
                }
            </App>
        )
    }
}

export default Hotel
