import React from "react";
import {store} from 'react-notifications-component';
import App from "../../containers/App";
import Card from "../../components/Card";
import UserService from "../../app/UserService";
import Loader from "react-loader-spinner";

class Login extends React.Component {
    state = {
        login: {
            username: '',
            password: ''
        },
        errors: {},
        loading: false
    }

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
        errors = this.userService.validateField(this.state.login, errors, name, value)

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
        this.setState({loading: true})

        let login = this.state.login;
        if (this.validateForm(login)) {
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

                    let navto = new URLSearchParams(this.props.location.search).get("navto")
                    if (navto) {
                        if (this.props.location.flightOffer) {
                            this.props.history.push(navto)
                        } else if (this.props.location.hotelOffer) {
                            this.props.history.push(navto)
                        } else {
                            store.addNotification({
                                title: 'Falha!',
                                message: 'Não foi possível direcionar você para a tela de compra, por favor, refaça sua pesquisa',
                                type: 'danger',
                                container: 'top-center',
                                animationIn: ["animated", "fadeIn"],
                                animationOut: ["animated", "fadeOut"],
                                dismiss: {
                                    duration: 3000
                                }
                            })

                            this.props.history.push('/')
                        }
                    } else {
                        this.props.history.push('/')
                    }

                    this.setState({loading: false})
                })
                .catch(error => {
                    if (error && error.response && error.response.data) {
                        store.addNotification({
                            title: 'Falha!',
                            message: error.response.data.error ? error.response.data.error : 'Não foi possível completar sua solicitação, por favor tente novamente mais tarde',
                            type: 'danger',
                            container: 'top-center',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 3000
                            }
                        })
                    }

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
                <Card header={"Logue em sua conta"}>
                    {!this.state.loading &&
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
                                    <a type="button" className="btn btn-link p-0" href="/recover-credentials">Esqueci minhas credenciais</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-primary">Logar</button>
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

export default Login;
