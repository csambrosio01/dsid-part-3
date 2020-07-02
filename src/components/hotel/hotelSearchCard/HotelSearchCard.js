import React from "react";
import SearchInput from "../../air/flightSearchCard/SearchInput";
import DatePicker from "react-datepicker";
import IncrementDecrementButton from "../../incrementDecrementButton/IncrementDecrementButton";
import InputRange from "react-input-range";
import './HotelSearchCard.css'
import ReactStars from "react-stars/dist/react-stars";

const oneDayInMillis = 24 * 60 * 60 * 1000

class HotelSearchCard extends React.Component {
    state = {
        searchObject: {
            cityCode: '',
            checkInDate: new Date(),
            checkOutDate:new Date(Date.now() + 7 * oneDayInMillis),
            roomQuantity: 1,
            adults: 1,
            radius: 20,
            rating: 5,
            priceRange: {
                min: 100,
                max: 1000
            }
        },
        searchButtonEnabled: false,
        priceInputValue: "100"
    }

    validateSearchObject = (searchObject) => {
        let isValid = true

        Object.keys(searchObject).forEach(fieldName => {
            switch (fieldName) {
                case 'cityCode':
                    let cityCode = searchObject.cityCode
                    if (cityCode.length < 3) isValid = false
                    break
                case 'checkInDate':
                    if (!searchObject.checkInDate) isValid = false
                    break
                case 'checkOutDate':
                    if (!searchObject.checkOutDate) isValid = false
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

    handleCheckInDateChange = (date) => {
        let searchObject = this.state.searchObject
        searchObject.checkInDate = date

        if (searchObject.checkInDate > searchObject.checkOutDate) {
            searchObject.checkOutDate = undefined
        }

        this.validateSearchObject(searchObject);
    };

    handleCheckOutDateChange = (date) => {
        let searchObject = this.state.searchObject
        searchObject.checkOutDate = date
        this.validateSearchObject(searchObject);
    };

    onFieldChange = (event, value) => {
        event.preventDefault()
        const name = event.target.name

        let searchObject = this.state.searchObject
        searchObject[name] = value
        this.validateSearchObject(searchObject);
    }

    onRangeChanged = (value) => {
        let searchObject = this.state.searchObject
        searchObject.priceRange = value
        this.validateSearchObject(searchObject)
    }

    changeRating = (value) => {
        let searchObject = this.state.searchObject
        searchObject.rating = value
        this.validateSearchObject(searchObject)
    }

    onClick = () => {
        this.props.onSearchCliked(this.state.searchObject)
    }

    render() {
        return (
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h3 className="card-title">Busque aqui pela cidade que deseja encontrar o hotel (apenas Estados Unidos e Europa)</h3>
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <div>
                                <label className="card-text">
                                    Destino
                                </label>
                            </div>
                            <SearchInput icon="fas fa-plane-arrival icon"
                                         placeholder="Destino"
                                         name="cityCode"
                                         onTextChange={this.onFieldChange}/>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-md-3">
                            <div className="input-icons">
                                <div>
                                    <label className="card-text">
                                        Data de entrada
                                    </label>
                                </div>
                                <i className="far fa-calendar-times icon"/>
                                <DatePicker
                                    className="input-field"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    selected={this.state.searchObject.checkInDate}
                                    onChange={this.handleCheckInDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-icons">
                                <div>
                                    <label className="card-text">
                                        Data de saída
                                    </label>
                                </div>
                                <i className="far fa-calendar-times icon"/>
                                <DatePicker
                                    className="input-field"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date(this.state.searchObject.checkInDate + oneDayInMillis)}
                                    selected={this.state.searchObject.checkOutDate}
                                    onChange={this.handleCheckOutDateChange}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <label className="card-text">
                                    Adultos
                                </label>
                            </div>
                            <IncrementDecrementButton name="adults"
                                                      minimum={1}
                                                      maximum={9}
                                                      updateCounter={this.onFieldChange}/>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <label className="card-text">
                                    Quartos
                                </label>
                            </div>
                            <IncrementDecrementButton name="roomQuantity"
                                                      minimum={1}
                                                      maximum={5}
                                                      updateCounter={this.onFieldChange}/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div>
                                <label className="card-text">
                                    Preço (em U$)
                                </label>
                            </div>
                            <InputRange minValue={100}
                                        maxValue={5000}
                                        onChange={this.onRangeChanged}
                                        value={this.state.searchObject.priceRange}/>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <label className="card-text">
                                    Quantidade de estrelas
                                </label>
                            </div>
                            <ReactStars count={5}
                                        size={40}
                                        color1={'#ffffff'}
                                        half={false}
                                        color2={'#ffd700'}
                                        value={this.state.searchObject.rating}
                                        onChange={this.changeRating}/>
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

export default HotelSearchCard
