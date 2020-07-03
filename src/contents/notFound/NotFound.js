import React from "react";
import App from "../../containers/App";

import './NotFound.css'

class NotFound extends React.Component {
    render() {
        return (
            <App>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2 className="mb-2">Oops! Esta página não pode ser encontrada</h2>
                        <p>Desculpe-nos, mas a página que você está procurando não pode ser encontrada. Ela pode ter sido removida pelo sistema, não existir ou
                             estar temporariamente indisponível</p>
                        <button type="button" className="btn btn-primary mt-2" onClick={() => this.props.history.push('/')}>Ir para a página inicial</button>
                    </div>
                </div>
            </App>
        )
    }
}

export default NotFound
