import React from "react";

import NumberFormat from 'react-number-format';

import App from "../containers/App";

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

    render() {
        return (
            <App>
                <div className="card">
                    <div className="card-header">
                        Cadastrar um novo usuário
                    </div>
                    <div className="card-body">
                        <form>
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
                    </div>
                </div>
            </App>
        )
    }
}

export default CreateUser;
