import React from "react";
import './Toast.css'

class Toast extends React.Component {
    state = {
        showToast: true
    }

    constructor(props) {
        super(props);

        this.setDivTimeout()
    }

    setDivTimeout = () => {
        setTimeout(() => {
            this.setState({showToast: false})
            setTimeout(() => {
                document.getElementById('toast').hidden = true
            }, 510)
        }, this.props.timeout ? this.props.timeout : 5000)
    }

    render() {
        return (
            <div className={this.state.showToast ? 'fadeIn alert alert-danger' : 'fadeOut alert alert-danger'} id="toast">
                <h4 className="alert-heading">{this.props.header}</h4>
                <p>{this.props.body}</p>
            </div>
        )
    }
}

export default Toast
