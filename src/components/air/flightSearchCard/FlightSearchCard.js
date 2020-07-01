import React from "react";
import DatePicker from "react-datepicker";
import SearchInput from "./SearchInput";
import './flightSearchCard.css'

class FlightSearchCard extends React.Component {
    state = {
        departureDate: new Date(),
        returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        passenger: 1,
        travelClass: ['Econômica', 'Econômica premium', 'Business', 'Primeira classe'],
        searchObject: {}
    };

    handleDepartureDateChange = (date) => {
        this.setState({
            departureDate: date
        });
    };

    handleReturnDateChange = (date) => {
        this.setState({
            returnDate: date
        });
    };

    decrementValue = (event) => {
        event.preventDefault();
        let currentVal = this.state.passenger

        if (!isNaN(currentVal) && currentVal > 0) {
            this.setState({passenger: currentVal - 1})
        } else {
            this.setState({passenger: 0})
        }
    }

    incrementValue = (event) => {
        event.preventDefault();
        let currentVal = this.state.passenger

        if (!isNaN(currentVal)) {
            this.setState({passenger: currentVal + 1})
        } else {
            this.setState({passenger: 0})
        }
    }

    onChange = (event) => {

    }

    render() {
        return (
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h3 className="card-title">Busque aqui sua passagem aérea (apenas Europa e América do Norte)</h3>
                    <div className="row pb-3">
                        <div className="form-check col-md-2">
                            <label className="form-check-label pl-3">
                                <input type="radio" className="form-check-input" name="optionsRadios"
                                       id="optionsRadios1" value="option1" checked onChange={this.onChange}/>
                                Ida e volta
                            </label>
                        </div>
                        <div className="form-check col-md-2">
                            <label className="form-check-label pl-3">
                                <input type="radio" className="form-check-input" name="optionsRadios"
                                       id="optionsRadios2" value="option2"/>
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
                                    selected={this.state.departureDate}
                                    onChange={this.handleDepartureDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3" hidden={this.state.oneWay}>
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
                                    selected={this.state.returnDate}
                                    onChange={this.handleReturnDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <label className="card-text mb-0">
                                    Classe
                                </label>
                                <select className="select-field">
                                    {this.state.travelClass.map(option => {
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
                                <input type="number" step="1" max="10" value={this.state.passenger} name="quantity" className="quantity-field" readOnly/>
                                <input type="button" value="+" className="button-plus" data-field="quantity" onClick={this.incrementValue}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 input-icons">
                            <i className="fas fa-search icon-white"/>
                            <button type="submit" className="btn btn-danger button">Procurar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightSearchCard;
