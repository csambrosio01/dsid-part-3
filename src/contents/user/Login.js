import React from "react";
import {store} from 'react-notifications-component';
import App from "../../containers/App";
import Card from "../../components/Card";
import UserService from "../../app/UserService";

const initialState = {
    login: {
        username: '',
        password: ''
    },
    errors: {}
}

class Login extends React.Component {
    state = initialState;

    constructor(props) {
        super(props);
        this.userService = new UserService();
    }

    onChange = (event) => {
        const { name, value } = event.target;
        let login = this.state.login
        login[name] = value
        this.setState({login})
    }

    onBlur = (event) => {
        const { name, value } = event.target;

        let errors = this.state.errors;
        errors = this.userService.validateField(this.state.user, errors, name, value)

        this.setState({errors})
    }

    validateForm = (login) => {
        let errors = this.userService.validate(login)

        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );

        this.setState({errors})
        return valid;
    }

    onSubmit = (event) => {
        event.preventDefault();

        let login = this.state.login;
        if (this.validateForm(login)) {
            debugger;
            this.userService.login(login)
                .then (() => {
                    store.addNotification({
                        title: 'Sucesso!',
                        message: 'Você foi logado com sucesso',
                        type: 'success',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000
                        }
                    })

                    this.props.history.push('/')
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
                })
        }
    }

    render() {
        return (
            <App>
                <Card header={"Logue em sua conta"}>
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Usuário:</label>
                                    <input type="text"
                                           name="username"
                                           value={this.state.login.username}
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
                                           value={this.state.login.password}
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           className="form-control"/>
                                    <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-primary">Logar</button>
                            </div>
                        </div>
                    </form>
                </Card>
            </App>
        )
    }
}

export default Login;
