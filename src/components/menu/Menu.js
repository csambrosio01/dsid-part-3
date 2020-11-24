import React from 'react'
import {Link} from 'react-router-dom'
import UserService from "../../app/UserService";
import {store} from "react-notifications-component";
import {withRouter} from 'react-router'

class Menu extends React.Component {
    state = {
        user: undefined
    }

    constructor(props) {
        super(props);
        this.userService = new UserService();
    }

    componentDidMount() {
        this.userService.getUser()
            .then(user => {
                this.setState({user})
            })
    }

    logout = () => {
        this.userService.logout()
            .then(() => {
                this.props.history.push('/')
                this.setState({user: undefined})
            })
            .catch(error => {
                store.addNotification({
                    title: 'Falha!',
                    message: 'Não foi possível deslogar, tente novamente',
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

    handleClick = () => {
        this.userService.shouldRedirectToBuyPage()
            .then(response => {
                if (response) {
                    this.props.history.push({
                        pathname: '/buy'
                    })
                } else {
                    this.props.history.push({
                        pathname: '/login',
                        search: `navto=/buy`,
                    })
                }
            })
    }

    render() {
        return (
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active d-inline-block text-center">
                        <Link className="nav-link" to="/air">
                            Aéreo
                        </Link>
                    </li>

                    <li className="nav-item active d-inline-block text-center">
                        <Link className="nav-link" to="/hotel">
                            Hotéis
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav my-2 my-lg-0">
                    <li className="nav-item active d-inline-block text-center mr-1">
                        <button type="button" className="btn btn-link" style={{color: "#ffffff"}} onClick={this.handleClick}>
                            <i className="fas fa-shopping-cart mt-1"/>
                        </button>
                    </li>

                    {!this.state.user &&
                    <li className="nav-item active d-inline-block text-center">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    }

                    {!this.state.user &&
                    <li className="nav-item active d-inline-block text-center">
                        <Link className="nav-link" to="/create-user">
                            Cadastre-se
                        </Link>
                    </li>
                    }

                    {this.state.user &&
                    <button type="button"
                            className="btn btn-danger"
                            onClick={this.logout}>
                        Logout
                    </button>
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Menu)
