import React from "react";
import App from "../../containers/App";
import Card from "../../components/Card";

class Login extends React.Component {
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
                                           className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Senha:</label>
                                    <input type="password"
                                           name="password"
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
