import React from "react";
import DatePicker from "react-datepicker";
import SearchInput from "./SearchInput";
import './flightSearchCard.css'
import IncrementDecrementButton from "../../incrementDecrementButton/IncrementDecrementButton";

const travelClasses = ['Econômica', 'Econômica Premium', 'Business', 'Primeira Classe']
const oneDayInMillis = 24 * 60 * 60 * 1000

class FlightSearchCard extends React.Component {
    state = {
        searchObject: {
            departureDate: new Date(),
            returnDate: new Date(Date.now() + 7 * oneDayInMillis),
            travelClass: 'ECONOMY',
            origin: '',
            destination: '',
            passenger: 1,
            oneWay: false
        },
        searchButtonEnabled: false
    };

    validateSearchObject = (searchObject) => {
        let isValid = true

        Object.keys(searchObject).forEach(fieldName => {
            switch (fieldName) {
                case 'origin':
                    let origin = searchObject.origin
                    if (origin.length < 3) isValid = false
                    break
                case 'destination':
                    let destination = searchObject.destination
                    if (destination.length < 3) isValid = false
                    break
                case 'departureDate':
                    if (!searchObject.departureDate) isValid = false
                    break
                case 'returnDate':
                    if (!searchObject.oneWay && !searchObject.returnDate) isValid = false
                    break
                default:
                    break
            }
        })

        if (isValid) {
            this.setState({searchButtonEnabled: true})
        } else {
            this.setState({searchButtonEnabled: false})
        }
        this.setState({searchObject})
    }

    handleDepartureDateChange = (date) => {
        let searchObject = this.state.searchObject
        searchObject.departureDate = date

        if (searchObject.departureDate > searchObject.returnDate) {
            searchObject.returnDate = undefined
        }

        this.validateSearchObject(searchObject);
    };

    handleReturnDateChange = (date) => {
        let searchObject = this.state.searchObject
        searchObject.returnDate = date
        this.validateSearchObject(searchObject);
    };

    radioButtonChanged = (event) => {
        const {name, value} = event.target;
        let searchObject = this.state.searchObject
        switch (true) {
            case (name === 'oneWayFalse' && value === 'on'):
                searchObject.oneWay = false
                break;
            case (name === 'oneWayTrue' && value === 'on'):
                searchObject.oneWay = true
                searchObject.returnDate = undefined
                break;
            default:
                break;
        }
        this.validateSearchObject(searchObject);
    }

    onFieldChange = (event, value) => {
        event.preventDefault()
        const name = event.target.name

        let searchObject = this.state.searchObject
        searchObject[name] = value
        this.validateSearchObject(searchObject);
    }

    onClassChanged = (event) => {
        const value = event.target.value
        let searchObject = this.state.searchObject

        switch (value) {
            case 'Econômica':
                searchObject.travelClass = 'ECONOMY'
                break;
            case 'Econômica Premium':
                searchObject.travelClass = 'PREMIUM_ECONOMY'
                break;
            case 'Business':
                searchObject.travelClass = 'BUSINESS'
                break;
            case 'Primeira Classe':
                searchObject.travelClass = 'FIRST'
                break;
            default:
                break;
        }

        this.validateSearchObject(searchObject);
    }

    onClick = () => {
        this.props.onSearchClicked(this.state.searchObject)
    }

    render() {
        return (
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h3 className="card-title">Busque aqui sua passagem aérea</h3>
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
                            <SearchInput icon="fas fa-plane-departure icon"
                                         placeholder="Origem"
                                         name="origin"
                                         onTextChange={this.onFieldChange}/>
                        </div>
                        <div className="col-md-6">
                            <SearchInput icon="fas fa-plane-arrival icon"
                                         placeholder="Destino"
                                         name="destination"
                                         onTextChange={this.onFieldChange}/>
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
                                    minDate={new Date()}
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
                                    minDate={new Date(this.state.searchObject.departureDate + oneDayInMillis)}
                                    selected={this.state.searchObject.returnDate}
                                    onChange={this.handleReturnDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <label className="card-text mb-0">
                                    Classe
                                </label>
                                <select className="select-field"
                                        onChange={this.onClassChanged}>
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
                            <IncrementDecrementButton name="passenger"
                                                      minimum={1}
                                                      maximum={9}
                                                      updateCounter={this.onFieldChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 input-icons">
                            <i className="fas fa-search icon-white"/>
                            <button type="submit"
                                    className="btn btn-danger button"
                                    onClick={this.onClick}
                                    disabled={!this.state.searchButtonEnabled}>
                                Procurar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightSearchCard;
