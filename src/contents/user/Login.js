import React from "react";
import App from "../../containers/App";
import Card from "../../components/Card";

const initialState = {
    login: {
        username: '',
        loginPassword: ''
    },
    errors: {}
}

class Login extends React.Component {
    state = initialState;

    onChange = (event) => {
        const { name, value } = event.target;
        let login = this.state.login
        login[name] = value
        this.setState({login})
    }

    render() {
        return (
            <App>
                <Card header={"Logue em sua conta"}>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Usuário:</label>
                                    <input type="text"
                                           name="username"
                                           value={this.state.login.username}
                                           onChange={this.onChange}
                                           className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Senha:</label>
                                    <input type="password"
                                           name="loginPassword"
                                           value={this.state.login.password}
                                           onChange={this.onChange}
                                           className="form-control"/>
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
