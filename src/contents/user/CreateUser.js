import React from "react";

import {store} from 'react-notifications-component';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner'

import UserService from '../../app/UserService'

import App from "../../containers/App";
import Card from "../../components/Card";
import ZipCodeService from "../../app/ZipCodeService";

class CreateUser extends React.Component {
    state = {
        user: {
            username: '',
            password: '',
            name: '',
            email: '',
            phoneNumber: '',
            confirmPassword: '',
            address: {
                zipCode: '',
                address: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                country: '',
                number: ''
            }
        },
        errors: {},
        loading: false,
        isZipCodeLoading: false
    }

    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.zipCodeService = new ZipCodeService();
    }

    validateForm = (user) => {
        let errors = this.userService.validate(user)

        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );

        this.setState({errors})
        return valid;
    }

    onChange = (event) => {
        const {name, value} = event.target;
        let user = this.state.user
        if (name === 'zipCode') {
            let zipCode = value
            user.address.zipCode = zipCode
            this.setState({user})

            if (zipCode.replace(/\D/g, '').length === 8) {
                this.setState({isZipCodeLoading: true})
                this.zipCodeService.getAddressByZipCode(zipCode.replace(/\D/g, ''))
                    .then(result => {
                        let address = result.data
                        user.address.zipCode = address.zipCode
                        user.address.address = address.address
                        user.address.neighborhood = address.neighborhood
                        user.address.city = address.city
                        user.address.state = address.state
                        user.address.country = address.country
                        this.setState({
                            user: user,
                            isZipCodeLoading: false
                        })
                    })
                    .catch(() => {
                        user.address.zipCode = zipCode
                        this.setState({
                            user: user,
                            isZipCodeLoading: false
                        })
                        store.addNotification({
                            title: 'Falha!',
                            message: 'Não conseguimos encontrar o endereço relacionado ao CEP digitado, por favor preencha-o manualmente',
                            type: 'danger',
                            container: 'top-center',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 3000
                            }
                        })
                    })
            }
        } else {
            if (name === 'address' ||
                name === 'neighborhood' ||
                name === 'city' ||
                name === 'state' ||
                name === 'country' ||
                name === 'complement' ||
                name === 'number') {
                user.address[name] = value
            } else {
                user[name] = value
            }
            this.setState({user})
        }
    }

    onBlur = (event) => {
        const {name, value} = event.target;

        let errors = this.state.errors;
        errors = this.userService.validateField(this.state.user, errors, name, value)

        this.setState({errors})
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true})

        let user = this.state.user;
        if (this.validateForm(user)) {
            user.phoneNumber = user.phoneNumber.replace(/\D/g, '')
            this.userService.createUser(user)
                .then(() => {
                    store.addNotification({
                        title: 'Sucesso!',
                        message: 'Usuário criado com sucesso',
                        type: 'success',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })

                    this.props.history.push('/')

                    this.setState({loading: false})
                })
                .catch(error => {
                    store.addNotification({
                        title: 'Falha!',
                        message: error.response.data.error,
                        type: 'danger',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })

                    this.setState({loading: false})
                })
        } else {
            store.addNotification({
                title: 'Falha!',
                message: 'Verifique os campos e tente novamente',
                type: 'danger',
                container: 'top-center',
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 3000
                }
            })

            this.setState({loading: false})
        }
    }

    render() {
        return (
            <App>
                <Card header={"Cadastrar um novo usuário"}>
                    {!this.state.loading &&
                    <form onSubmit={this.onSubmit}>
                        <h3 className="mb-3" style={{color: '#495057'}}>Informações básicas</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nome Completo:</label>
                                    <input type="text"
                                           name="name"
                                           value={this.state.user.name}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>E-mail:</label>
                                    <input type="text"
                                           name="email"
                                           value={this.state.user.email}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Telefone:</label>
                                    <NumberFormat name="phoneNumber"
                                                  format="(##) ##### ####"
                                                  value={this.state.user.phoneNumber}
                                                  onChange={this.onChange}
                                                  onBlur={this.onBlur}
                                                  className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["phoneNumber"]}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Usuário:</label>
                                    <input type="text"
                                           name="username"
                                           value={this.state.user.username}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["username"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Senha:</label>
                                    <input type="password"
                                           name="password"
                                           value={this.state.user.password}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Confirmar senha:</label>
                                    <input type="password"
                                           name="confirmPassword"
                                           value={this.state.user.confirmPassword}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["confirmPassword"]}</span>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3"/>
                        <h3 className="mb-3" style={{color: '#495057'}}>Endereço</h3>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>CEP</label>
                                    <NumberFormat name="zipCode"
                                                  format="#####-###"
                                                  value={this.state.user.address.zipCode}
                                                  onChange={this.onChange}
                                                  onBlur={this.onBlur}
                                                  className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["zipCode"]}</span>
                                </div>
                            </div>
                            <div className="col-md-1 justify-content-center">
                                {this.state.isZipCodeLoading &&
                                <React.Fragment>
                                    <label/>
                                    <div className="mt-1">
                                        <Loader type="Oval" color="Blue" height={40} width={40}/>
                                    </div>
                                </React.Fragment>
                                }
                            </div>
                            <div className="col-md-9">
                                <div className="form-group">
                                    <label>Logradouro</label>
                                    <input type="text"
                                           name="address"
                                           value={this.state.user.address.address}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["address"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>Número</label>
                                    <input type="text"
                                           name="number"
                                           value={this.state.user.address.number}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["number"]}</span>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Complemento</label>
                                    <input type="text"
                                           name="complement"
                                           value={this.state.user.address.complement}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Bairro</label>
                                    <input type="text"
                                           name="neighborhood"
                                           value={this.state.user.address.neighborhood}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["neighborhood"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Cidade</label>
                                    <input type="text"
                                           name="city"
                                           value={this.state.user.address.city}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["city"]}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Estado</label>
                                    <input type="text"
                                           name="state"
                                           value={this.state.user.address.state}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["state"]}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>País</label>
                                    <input type="text"
                                           name="country"
                                           value={this.state.user.address.country}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["country"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                    }

                    {this.state.loading &&
                    <div className="d-flex justify-content-center">
                        <Loader type="Oval" color="Blue" height={100} width={100}/>
                    </div>
                    }
                </Card>
            </App>
        )
    }
}

export default CreateUser;
