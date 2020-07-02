import React from 'react'

import App from "../containers/App";
import HotelSearchCard from "../components/hotel/hotelSearchCard/HotelSearchCard";
import HotelService from "../app/HotelService";
import Loader from "react-loader-spinner";
import HotelSearchInfoCard from "../components/hotel/hotelSearchInfoCard/HotelSearchInfoCard";
import HotelInfoCard from "../components/hotel/hotelInfoCard/HotelInfoCard";

class Hotel extends React.Component {
    state = {
        hotelSearchOffers: [],
        hotelHighlightsOffers: [],
        isHotelSearchOffersLoading: false,
        isHotelHighlightOffersLoading: false,
        hasSearched: false
    }

    constructor(props) {
        super(props);
        this.hotelService = new HotelService();
    }

    componentDidMount() {
        this.getHotelOffersHighlights()
    }

    getHotelOffersHighlights = () => {
        this.setState({isHotelHighlightOffersLoading: true})
        this.hotelService.getHotelOffersHighlightsHotelPage()
            .then(response => {
                this.setState({
                    hotelHighlightsOffers: response.data,
                    isHotelHighlightOffersLoading: false
                })
            })
            .catch(() => {
                this.setState({isHotelHighlightOffersLoading: false})
            })
    }

    onSearchClicked = (searchObject) => {
        this.setState({
            hasSearched: true,
            isHotelSearchOffersLoading: true
        })

        this.hotelService.getHotelOffers(searchObject)
            .then(response => {
                let hotelHighlightOffers = this.state.hotelHighlightsOffers
                if (hotelHighlightOffers.length > 3) {
                    hotelHighlightOffers = hotelHighlightOffers.slice(0, 3)
                }
                this.setState({
                    hotelHighlightOffers: hotelHighlightOffers,
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
                <hr className="my-4" hidden={!this.state.hasSearched}/>
                <div>
                    {!this.state.isHotelHighlightOffersLoading &&
                    <div className="mb-5">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h2>Principais ofertas de hotéis</h2>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.hotelHighlightsOffers.map(hotelOffer => {
                                return (
                                    <HotelInfoCard hotelOffer={hotelOffer}/>
                                )
                            })}
                        </div>
                    </div>
                    }
                    {this.state.isHotelHighlightOffersLoading &&
                    <div className="col-md-12 d-flex justify-content-center mb-5">
                        <Loader type="Oval" color="Blue" height={100} width={100}/>
                    </div>
                    }
                </div>
            </App>
        )
    }
}

export default Hotel
