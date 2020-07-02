import React from 'react'

import App from "../containers/App";
import FlightHighlight from "../components/home/flightHighlight/FlightHighlight";
import FlightService from "../app/FlightService";
import Loader from "react-loader-spinner";

class Home extends React.Component {
    state = {
        flightOffers: [],
        hotelOffers: [],
        isFlightOffersHighlightLoading: false,
    }

    constructor(props) {
        super(props);
        this.flightService = new FlightService();
    }

    componentDidMount() {
        this.getFlightOffersHighlights()
    }

    getFlightOffersHighlights = () => {
        this.setState({isFlightOffersHighlightLoading: true})
        this.flightService.getFlightOffersHighlights()
            .then(response => {
                this.setState({
                    flightOffers: response.data,
                    isFlightOffersHighlightLoading: false
                })
            })
            .catch(() => {
                this.setState({isFlightOffersHighlightLoading: false})
            })
    }

    render() {
        return (
            <App>
                <ol className="breadcrumb">
                    <h1>Principais ofertas</h1>
                </ol>

                {!this.state.isFlightOffersHighlightLoading &&
                <React.Fragment>
                    <FlightHighlight flightOffers={this.state.flightOffers}/>

                <h2>Hotéis</h2>

                    <h2>Carros</h2>
                </React.Fragment>
                }
                {this.state.isFlightOffersHighlightLoading &&
                <div className="d-flex justify-content-center">
                    <Loader type="Oval" color="Blue" height={100} width={100}/>
                </div>
                }
            </App>
        )
    }
}

export default Home
