import React from "react";
import DatePicker from "react-datepicker";
import SearchInput from "./SearchInput";
import './flightSearchCard.css'

const travelClasses = ['Econômica', 'Econômica premium', 'Bussiness', 'Primeira Classe']

class FlightSearchCard extends React.Component {
    state = {
        searchObject: {
            departureDate: new Date(),
            returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            travelClass: 'ECONOMY',
            origin: '',
            destination: '',
            passenger: 1,
            oneWay: false
        }
    };

    handleDepartureDateChange = (date) => {
        let searchObject = this.state.searchObject
        searchObject.departureDate = date
        this.setState({searchObject});
    };

    handleReturnDateChange = (date) => {
        let searchObject = this.state.searchObject
        searchObject.returnDate = date
        this.setState({searchObject});
    };

    decrementValue = (event) => {
        event.preventDefault();
        let currentVal = this.state.passenger

        if (!isNaN(currentVal) && currentVal > 0) {
            let searchObject = this.state.searchObject
            searchObject.passenger = currentVal - 1
            this.setState({searchObject});
        } else {
            let searchObject = this.state.searchObject
            searchObject.passenger = 0
            this.setState({searchObject});
        }
    }

    incrementValue = (event) => {
        event.preventDefault();
        let currentVal = this.state.passenger

        if (!isNaN(currentVal)) {
            let searchObject = this.state.searchObject
            searchObject.passenger = currentVal + 1
            this.setState({searchObject});
        } else {
            let searchObject = this.state.searchObject
            searchObject.passenger = 0
            this.setState({searchObject});
        }
    }

    radioButtonChanged = (event) => {
        const {name, value} = event.target;
        let searchObject = this.state.searchObject
        switch (true) {
            case (name === 'oneWayFalse' && value === 'on'):
                searchObject.oneWay = false
                break;
            case (name === 'oneWayTrue' && value === 'on'):
                searchObject.oneWay = true
                break;
        }
        this.setState({searchObject});
    }

    onClick = () => {
        this.props.onSearchCliked(this.state.searchObject)
    }

    render() {
        return (
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h3 className="card-title">Busque aqui sua passagem aérea (apenas Europa e América do Norte)</h3>
                    <div className="row pb-3">
                        <div className="form-check col-md-2">
                            <label className="form-check-label pl-3">
                                <input type="radio"
                                       name="oneWayFalse"
                                       className="form-check-input"
                                       checked={!this.state.searchObject.oneWay}
                                       onChange={this.radioButtonChanged}/>
                                Ida e volta
                            </label>
                        </div>
                        <div className="form-check col-md-2">
                            <label className="form-check-label pl-3">
                                <input type="radio"
                                       name="oneWayTrue"
                                       className="form-check-input"
                                       checked={this.state.searchObject.oneWay}
                                       onChange={this.radioButtonChanged}/>
                                Somente ida
                            </label>
                        </div>
                    </div>

                    <div className="row pb-3">
                        <div className="col-md-6">
                            <SearchInput icon="fas fa-plane-departure icon" placeholder="Origem"/>
                        </div>
                        <div className="col-md-6">
                            <SearchInput icon="fas fa-plane-arrival icon" placeholder="Destino"/>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-md-3">
                            <div className="input-icons">
                                <div>
                                    <label className="card-text">
                                        Data de ida
                                    </label>
                                </div>
                                <i className="far fa-calendar-times icon"/>
                                <DatePicker
                                    className="input-field"
                                    dateFormat="dd/MM/yyyy"
                                    selected={this.state.searchObject.departureDate}
                                    onChange={this.handleDepartureDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3" hidden={this.state.searchObject.oneWay}>
                            <div className="input-icons">
                                <div>
                                    <label className="card-text">
                                        Data de volta
                                    </label>
                                </div>
                                <i className="far fa-calendar-times icon"/>
                                <DatePicker
                                    className="input-field"
                                    dateFormat="dd/MM/yyyy"
                                    selected={this.state.searchObject.returnDate}
                                    onChange={this.handleReturnDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <label className="card-text mb-0">
                                    Classe
                                </label>
                                <select className="select-field">
                                    {travelClasses.map(option => {
                                        return (
                                            <option key={option}>{option}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <label className="card-text">
                                    Passageiros
                                </label>
                            </div>
                            <div className="input-group">
                                <input type="button" value="-" className="button-minus" data-field="quantity" onClick={this.decrementValue}/>
                                <input type="number" step="1" max="10" value={this.state.searchObject.passenger} name="quantity" className="quantity-field" readOnly/>
                                <input type="button" value="+" className="button-plus" data-field="quantity" onClick={this.incrementValue}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 input-icons">
                            <i className="fas fa-search icon-white"/>
                            <button type="submit" className="btn btn-danger button" onClick={this.onClick}>Procurar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightSearchCard;
