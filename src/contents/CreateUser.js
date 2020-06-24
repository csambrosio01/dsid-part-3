import React from "react";

import {store} from 'react-notifications-component';
import NumberFormat from 'react-number-format';

import UserService from '../app/UserService'

import App from "../containers/App";
import Card from "../components/Card";

const initialState = {
    user: {
        username: '',
        password: '',
        name: '',
        email: '',
        phoneNumber: '',
        confirmPassword: ''
    },
    errors: {}
}

class CreateUser extends React.Component {
    state = initialState;

    constructor(props) {
        super(props);
        this.userService = new UserService();
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
        const { name, value } = event.target;
        let user = this.state.user
        user[name] = value
        this.setState({user})
    }

    onBlur = (event) => {
        const { name, value } = event.target;

        let errors = this.state.errors;
        errors = this.userService.validateField(this.state.user, errors, name, value)

        this.setState({errors})
    }

    onSubmit = (event) => {
        event.preventDefault();

        let user = this.state.user;
        if (this.validateForm(user)) {
            user.phoneNumber = user.phoneNumber.replace(/\D/g,'')
            this.userService.createUser(user)
                .then(response => {
                    this.userService.save(response.data)

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
                })
                .catch(error => {
                    store.addNotification({
                        title: 'Falha!',
                        message: 'Não foi possível criar o usuário',
                        type: 'danger',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })
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
        }
    }

    render() {
        return (
            <App>
                <Card header={"Cadastrar um novo usuário"}>
                    <form onSubmit={this.onSubmit}>
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
                        </div>
                        <div className="row">
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
                        </div>
                        <div className="row">
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
                        </div>
                        <div className="row">
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

                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </Card>
            </App>
        )
    }
}

export default CreateUser;
