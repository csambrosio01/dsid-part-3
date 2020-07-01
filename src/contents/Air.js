import React from 'react'

import App from "../containers/App";
import FlightSearchCard from "../components/air/flightSearchCard/FlightSearchCard";
import FlightService from "../app/FlightService";
import Loader from "react-loader-spinner";
import FlightInfoCard from "../components/air/flightInfoCard/FlightInfoCard";

class Air extends React.Component {
    state = {
        flightOffers: [],
        isFlightOffersLoading: false
    }

    constructor(props) {
        super(props);
        this.flightService = new FlightService();
    }

    componentDidMount() {
        this.getFlightOffersHighlights()
    }

    getFlightOffersHighlights = () => {
        this.setState({isFlightOffersLoading: true})
        this.flightService.getFlightOffersHighlightsAirPage()
            .then(response => {
                this.setState({
                    flightOffers: response.data,
                    isFlightOffersLoading: false
                })
            })
            .catch(() => {
                this.setState({isFlightOffersLoading: false})
            })
    }

    onSearchClicked = (searchObject) => {
        this.flightService.getFlightOrders(searchObject)
    }

    render() {
        return (
            <App>
                <div className="jumbotron">
                    <h1 className="display-3">Aéreo</h1>

                    <p className="lead">Encontre aqui as melhores ofertas de passagens para a sua viagem.</p>

                    <hr className="my-4"/>

                    <FlightSearchCard onSearchCliked={this.onSearchClicked}/>
                </div>
                <div>
                    {!this.state.isFlightOffersLoading &&
                    <div className="mb-5">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h2>Principais ofertas de passagens</h2>
                            </div>
                        </div>
                        <div className="row">

                            {this.state.flightOffers.map(flightOffer => {
                                return (
                                    <FlightInfoCard flightOffer={flightOffer}/>
                                )
                            })}
                        </div>
                    </div>
                    }
                    {this.state.isFlightOffersLoading &&
                    <div className="col-md-12 d-flex justify-content-center mb-5">
                        <Loader type="Oval" color="Blue" height={100} width={100}/>
                    </div>
                    }
                </div>
            </App>
        )
    }
}

export default Air
