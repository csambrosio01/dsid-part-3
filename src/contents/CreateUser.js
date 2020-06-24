import React from "react";

import App from "../containers/App";

class CreateUser extends React.Component {
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
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>E-mail:</label>
                                        <input type="text"
                                               name="email"
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Telefone:</label>
                                        <input type="text"
                                               name="phoneNumber"
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Confirmar senha:</label>
                                        <input type="password"
                                               name="confirmPassword"
                                               className="form-control"/>
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
