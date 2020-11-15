import React from "react";
import App from "../../containers/App";
import Card from "../../components/Card";
import FlightService from "../../app/FlightService";
import NumberFormat from "react-number-format";

import './Buy.css'
import {store} from "react-notifications-component";

class Buy extends React.Component {

    state = {
        card: {
            number: '',
            name: '',
            dueDate: '',
            cvv: '',
            cpf: ''
        },
        passengers: [],
        errors: {}
    }

    constructor(props) {
        super(props);

        this.flightService = new FlightService()
        this.flightOffer = props.location.flightOffer
    }

    componentDidMount() {
        if (this.flightOffer) {
            if (!this.flightOffer.numberOfPassengers || this.flightOffer.numberOfPassengers === 0) {
                this.flightOffer.numberOfPassengers = 1
            }

            let passengers = []

            for (let i = 1; i <= this.flightOffer.numberOfPassengers; i++) {
                let passenger = {
                    number: i,
                    name: '',
                    country: '',
                    document: ''
                }
                passengers.push(passenger)
            }

            this.setState({passengers})
        } else {
            this.props.history.push('/404')
        }
    }

    getTitle = () => {
        let title = ''

        let origin = this.flightOffer.itineraries[0].segments[0].departure.iataCode
        let destination = this.flightOffer.itineraries[0].segments[this.flightOffer.itineraries[0].segments.length - 1].arrival.iataCode
        title += origin + ' - ' + destination

        return title
    }

    checkOneWay = () => {
        return this.flightOffer.itineraries.length === 1
    }

    getTime = (date) => {
        return date.substring(11, 16)
    }

    getDate = (date) => {
        const d = new Date(date)
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }).format(d)
    }

    handleClick = () => {
        store.addNotification({
            title: 'Sucesso!',
            message: 'Sua compra foi efetuada com sucesso',
            type: 'success',
            container: 'top-center',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000
            }
        })

        this.props.history.push('/')
    }

    render() {
        if (!this.props.location.flightOffer) {
            return <div/>
        }
        let days = []
        for (let i = 1; i <= 31; i++) {
            days.push(<option key={i}>i</option>)
        }
        let months = []
        for (let i = 1; i <= 12; i++) {
            months.push(<option key={i}>i</option>)
        }
        let years = []
        for (let i = 1920; i <= 2008; i++) {
            years.push(<option key={i}>i</option>)
        }
        return (
            <App>
                <div className="row">
                    <div className="col-lg-8">
                        <Card header={"Selecione o método de pagamento"}>
                            <div>
                                <div className="mb-2">
                                    <input type="radio" value="creditCard" name="paymentType" checked={true}/> Cartão de
                                    crédito
                                </div>
                                <div className="mb-2">
                                    <input type="radio" value="debitCard" name="paymentType" disabled={true}/> Cartão de
                                    débito
                                </div>
                                <div>
                                    <input type="radio" value="boleto" name="paymentType" disabled={true}/> Boleto
                                </div>
                            </div>
                        </Card>
                        <Card header={"Complete com os dados do cartão"}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Número</label>
                                        <NumberFormat name="cardNumber"
                                                      format="#### #### #### ####"
                                                      value={this.state.card.number}
                                                      onChange={this.onChange}
                                                      onBlur={this.onBlur}
                                                      className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nome do titular</label>
                                        <input type="text"
                                               value={this.state.card.name}
                                               onChange={this.onChange}
                                               onBlur={this.onBlur}
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Vencimento</label>
                                        <NumberFormat name="dueDate"
                                                      format="##/##"
                                                      value={this.state.card.dueDate}
                                                      onChange={this.onChange}
                                                      onBlur={this.onBlur}
                                                      className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <NumberFormat name="cvv"
                                                      format="###"
                                                      value={this.state.card.cvv}
                                                      onChange={this.onChange}
                                                      onBlur={this.onBlur}
                                                      className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>CPF</label>
                                        <NumberFormat name="cpf"
                                                      format="###.###.###-##"
                                                      value={this.state.card.cpf}
                                                      onChange={this.onChange}
                                                      onBlur={this.onBlur}
                                                      className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card header={"Passageiros"}>
                            {this.state.passengers.map(passenger => {
                                return <>
                                    <div className="card-title route label">Passageiro {passenger.number}</div>
                                    <div className="row">
                                        <div className="form-group col-md-9">
                                            <label>Nome Completo:</label>
                                            <input type="text"
                                                   name="name"
                                                   onChange={this.onChange}
                                                   onBlur={this.onBlur}
                                                   className="form-control"/>
                                            <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-9">
                                            <label>País de residência:</label>
                                            <input type="text"
                                                   name="country"
                                                   onChange={this.onChange}
                                                   onBlur={this.onBlur}
                                                   className="form-control"/>
                                            <span style={{color: "red"}}>{this.state.errors["country"]}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Tipo e número de documento:</label>
                                        <div className="row">
                                            <div className="col-md-3 mb-4">
                                                <select className="form-control" name="docType">
                                                    <option>CPF</option>
                                                    <option>Passaporte</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text"
                                                           name="document"
                                                           onChange={this.onChange}
                                                           onBlur={this.onBlur}
                                                           className="form-control"/>
                                                    <span style={{color: "red"}}>{this.state.errors["document"]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Data de nascimento:</label>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <select className="form-control" name="birthDate">
                                                    <option>Dia</option>
                                                    {days}
                                                </select>
                                                <span style={{color: "red"}}>{this.state.errors["document"]}</span>
                                            </div>
                                            <div className="col-md-3">
                                                <select className="form-control" name="birthDate">
                                                    <option>Mês</option>
                                                    {months}
                                                </select>
                                                <span style={{color: "red"}}>{this.state.errors["document"]}</span>
                                            </div>
                                            <div className="col-md-3">
                                                <select className="form-control" name="birthDate">
                                                    <option>Ano</option>
                                                    {years}
                                                </select>
                                                <span style={{color: "red"}}>{this.state.errors["document"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Sexo:</label>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="radio" name="paymentType"/> Masculino
                                            </div>
                                            <div className="col-md-3">
                                                <input type="radio" value="debitCard" name="paymentType"/> Feminino
                                            </div>
                                        </div>
                                        <span style={{color: "red"}}>{this.state.errors["document"]}</span>
                                    </div>
                                    {this.state.passengers.length > 1 && (this.state.passengers.length !== passenger.number) &&
                                    <div className="border mb-4"/>
                                    }
                                </>
                            })}
                        </Card>
                    </div>
                    <div className="col-lg-4">
                        <Card header={"Informações de pagamento"}>
                            <div className="mb-2">
                                <div className="card-title route label">
                                    {this.getTitle()}
                                </div>
                                {this.checkOneWay() ? <div className="one-way label">Somente ida</div> :
                                    <div className="one-way label">Ida e volta</div>}
                            </div>
                            <div className="border"/>
                            <div>
                                <div className="card-text destination-title label">Ida</div>
                                <div
                                    className="date label">{this.getDate(this.props.location.flightOffer.itineraries[0].segments[0].departure.at)}</div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 pr-xl-0">
                                    <div
                                        className="iataCode">{this.props.location.flightOffer.itineraries[0].segments[0].departure.iataCode}</div>
                                    <div
                                        className="time label">{this.getTime(this.props.location.flightOffer.itineraries[0].segments[0].departure.at)}</div>
                                </div>
                                <div className="col-xl-3 px-xl-0 d-none d-xl-block">
                                    <div className="number-of-stops label">
                                        {this.flightService.getNumberOfStops(this.props.location.flightOffer.itineraries[0].segments.length - 1)}
                                    </div>
                                </div>
                                <div className="col-xl-3 px-xl-0">
                                    <div
                                        className="iataCode">{this.props.location.flightOffer.itineraries[0].segments[this.props.location.flightOffer.itineraries[0].segments.length - 1].arrival.iataCode}</div>
                                    <div
                                        className="time label">{this.getTime(this.props.location.flightOffer.itineraries[0].segments[this.props.location.flightOffer.itineraries[0].segments.length - 1].arrival.at)}</div>
                                </div>
                                <div className="col-xl-3 pl-xl-0">
                                    <div className="iataCode">Duração</div>
                                    <div
                                        className="time label">{this.flightService.convertDuration(this.props.location.flightOffer.itineraries[0].duration)}</div>
                                </div>
                            </div>
                            <div className="border"/>
                            {!this.checkOneWay() &&
                            <>
                                <div>
                                    <div className="card-text destination-title label">Volta</div>
                                    <div
                                        className="date label">{this.getDate(this.props.location.flightOffer.itineraries[1].segments[0].departure.at)}</div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 pr-xl-0">
                                        <div
                                            className="iataCode">{this.props.location.flightOffer.itineraries[1].segments[0].departure.iataCode}</div>
                                        <div
                                            className="time label">{this.getTime(this.props.location.flightOffer.itineraries[1].segments[0].departure.at)}</div>
                                    </div>
                                    <div className="col-xl-3 px-xl-0 d-none d-xl-block">
                                        <div className="number-of-stops label">
                                            {this.flightService.getNumberOfStops(this.props.location.flightOffer.itineraries[1].segments.length - 1)}
                                        </div>
                                    </div>
                                    <div className="col-xl-3 px-xl-0">
                                        <div
                                            className="iataCode">{this.props.location.flightOffer.itineraries[1].segments[this.props.location.flightOffer.itineraries[1].segments.length - 1].arrival.iataCode}</div>
                                        <div
                                            className="time label">{this.getTime(this.props.location.flightOffer.itineraries[1].segments[this.props.location.flightOffer.itineraries[1].segments.length - 1].arrival.at)}</div>
                                    </div>
                                    <div className="col-xl-3 pl-xl-0">
                                        <div className="iataCode">Duração</div>
                                        <div
                                            className="time label">{this.flightService.convertDuration(this.props.location.flightOffer.itineraries[1].duration)}</div>
                                    </div>
                                </div>
                            </>
                            }
                            <div className="border"/>
                            <div className="destination-title label">Valor por pessoa:
                                U$ {this.props.location.flightOffer.travelerPricings[0].price.total}</div>
                            <div className="route label">Valor total:
                                U$ {this.props.location.flightOffer.price.total}</div>
                            <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Comprar</button>
                        </Card>
                    </div>
                </div>
            </App>
        )
    }
}

export default Buy
