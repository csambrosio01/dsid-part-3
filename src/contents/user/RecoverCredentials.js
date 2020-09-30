import React from "react";
import App from "../../containers/App";
import Card from "../../components/Card";
import Loader from "react-loader-spinner";
import UserService from "../../app/UserService";
import {store} from "react-notifications-component";

class RecoverCredentials extends React.Component {
    state = {
        recoverPassword: {
            email: ''
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
        let recoverPassword = this.state.recoverPassword
        recoverPassword[name] = value
        this.setState({recoverPassword})
    }

    onBlur = (event) => {
        const { name, value } = event.target;

        let errors = this.state.errors;
        errors = this.userService.validateField(this.state.recoverPassword, errors, name, value)

        this.setState({errors})
    }

    validateForm = (recoverPassword) => {
        let errors = this.userService.validate(recoverPassword)

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

        let recoverPassword = this.state.recoverPassword;
        if (this.validateForm(recoverPassword)) {
            this.userService.recoverPassword(recoverPassword)
                .then (() => {
                    store.addNotification({
                        title: 'Sucesso!',
                        message: 'Nós enviamos um e-mail para você com as suas credenciais',
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
                        message: 'Não foi possível concluir o seu pedido. Por favor, tente novamente mais tarde.',
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
                message: 'Verifique o campo e tente novamente',
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
                <Card header={"Recuperação de credenciais"}>
                    {!this.state.loading &&
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="text"
                                               name="email"
                                               value={this.state.recoverPassword.email}
                                               onChange={this.onChange}
                                               onBlur={this.onBlur}
                                               className="form-control"/>
                                        <span style={{color: "red"}}>{this.state.errors["email"]}</span>
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

export default RecoverCredentials;
