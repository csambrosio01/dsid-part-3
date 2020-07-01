import React from "react";
import Loader from "react-loader-spinner";
import moment from "moment";

import FlightService from "../../../app/FlightService";

import './FlightHighlight.css'
import FlightInfoCard from "../../air/flightInfoCard/FlightInfoCard";

class FlightHighlight extends React.Component {
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
        this.flightService.getFlightOffersHighlights()
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

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Aéreo</h2>
                </div>
                {!this.state.isFlightOffersLoading &&
                this.state.flightOffers.map(flightOffer => {
                    return (
                        <FlightInfoCard flightOffer={flightOffer} />
                    )
                })
                }
                {this.state.isFlightOffersLoading &&
                <div className="col-md-12 d-flex justify-content-center">
                    <Loader type="Oval" color="Blue" height={100} width={100}/>
                </div>
                }
            </div>
        )
    }
}

export default FlightHighlight
