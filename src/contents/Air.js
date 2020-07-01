import React from 'react'

import App from "../containers/App";
import FlightSearchCard from "../components/air/flightSearchCard/FlightSearchCard";
import FlightService from "../app/FlightService";
import Loader from "react-loader-spinner";
import FlightInfoCard from "../components/air/flightInfoCard/FlightInfoCard";
import FlightSearchInfoCard from "../components/air/flightSearchInfoCard/FlightSearchInfoCard";

class Air extends React.Component {
    state = {
        flightHighlightOffers: [],
        flightSearchOffers: [],
        isFlightHighlightOffersLoading: false,
        isFlightSearchOffersLoading: false,
        hasSearched: false
    }

    constructor(props) {
        super(props);
        this.flightService = new FlightService();
    }

    componentDidMount() {
        this.getFlightOffersHighlights()
    }

    getFlightOffersHighlights = () => {
        this.setState({isFlightHighlightOffersLoading: true})
        this.flightService.getFlightOffersHighlightsAirPage()
            .then(response => {
                this.setState({
                    flightHighlightOffers: response.data,
                    isFlightHighlightOffersLoading: false
                })
            })
            .catch(() => {
                this.setState({isFlightHighlightOffersLoading: false})
            })
    }

    onSearchClicked = (searchObject) => {
        this.setState({
            hasSearched: true,
            isFlightSearchOffersLoading: true
        })
        this.flightService.getFlightOrders(searchObject)
            .then(response => {
                let flightHighlightOffers = this.state.flightHighlightOffers
                if (flightHighlightOffers.length > 3) {
                    flightHighlightOffers = flightHighlightOffers.slice(0, 3)
                }
                this.setState({
                    flightHighlightOffers: flightHighlightOffers,
                    flightSearchOffers: response.data,
                    isFlightSearchOffersLoading: false
                })
            })
            .catch(() => {
                this.setState({isFlightSearchOffersLoading: false})
            })
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
                    {(this.state.hasSearched && !this.state.isFlightSearchOffersLoading) &&
                    <div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h2>Sua busca</h2>
                            </div>
                        </div>
                        {this.state.flightSearchOffers.map(flightOffer => {
                            return (
                                <FlightSearchInfoCard flightOffer={flightOffer}/>
                            )
                        })}

                    </div>
                    }
                    {(this.state.hasSearched && this.state.isFlightSearchOffersLoading) &&
                    <div className="col-md-12 d-flex justify-content-center mb-5">
                        <Loader type="Oval" color="Blue" height={100} width={100}/>
                    </div>
                    }
                </div>
                <hr className="my-4" hidden={!this.state.hasSearched}/>
                <div>
                    {!this.state.isFlightHighlightOffersLoading &&
                    <div className="mb-5">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h2>Principais ofertas de passagens</h2>
                            </div>
                        </div>
                        <div className="row">

                            {this.state.flightHighlightOffers.map(flightOffer => {
                                return (
                                    <FlightInfoCard flightOffer={flightOffer}/>
                                )
                            })}
                        </div>
                    </div>
                    }
                    {this.state.isFlightHighlightOffersLoading &&
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
