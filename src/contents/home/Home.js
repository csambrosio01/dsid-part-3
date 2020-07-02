import React from 'react'

import App from "../../containers/App";
import FlightHighlight from "../../components/home/flightHighlight/FlightHighlight";
import HotelHighlight from "../../components/home/hotelHighlight/HotelHighlight";
import HotelService from "../../app/HotelService";
import FlightService from "../../app/FlightService";
import Loader from "react-loader-spinner";

class Home extends React.Component {
    state = {
        flightOffers: [],
        hotelOffers: [],
        isFlightOffersHighlightLoading: false,
        isHotelOffersHighlightsLoading: false
    }

    constructor(props) {
        super(props);
        this.flightService = new FlightService();
        this.hotelService = new HotelService();
    }

    componentDidMount() {
        this.getFlightOffersHighlights()
    }

    getFlightOffersHighlights = () => {
        this.setState({isFlightOffersHighlightLoading: true})
        this.flightService.getFlightOffersHighlights()
            .then(response => {
                this.getHotelOffersHighlights()
                this.setState({
                    flightOffers: response.data,
                    isFlightOffersHighlightLoading: false
                })
            })
            .catch(() => {
                this.setState({isFlightOffersHighlightLoading: false})
            })
    }

    getHotelOffersHighlights = () => {
        this.setState({isHotelOffersHighlightsLoading: true})
        this.hotelService.getHotelOffersHighlights()
            .then(response => {
                this.setState({
                    hotelOffers: response.data,
                    isHotelOffersHighlightsLoading: false
                })
            })
            .catch(() => {
                this.setState({isHotelOffersHighlightsLoading: false})
            })
    }

    render() {
        return (
            <App>
                <ol className="breadcrumb">
                    <h1>Principais ofertas</h1>
                </ol>

                {(!this.state.isFlightOffersHighlightLoading &&
                  !this.state.isHotelOffersHighlightsLoading) &&
                <React.Fragment>
                    <FlightHighlight flightOffers={this.state.flightOffers}/>

                    <HotelHighlight hotelOffers={this.state.hotelOffers}/>

                    <h2>Carros</h2>

                    <div className="alert alert-danger">
                        <h4 className="alert-heading">Essa não!</h4>
                        <p>Não conseguimos encontrar nenhuma oferta especial de carros, por favor, tente novamente mais
                            tarde</p>
                    </div>
                </React.Fragment>
                }
                {(this.state.isFlightOffersHighlightLoading ||
                  this.state.isHotelOffersHighlightsLoading) &&
                <div className="d-flex justify-content-center">
                    <Loader type="Oval" color="Blue" height={100} width={100}/>
                </div>
                }
            </App>
        )
    }
}

export default Home
