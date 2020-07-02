import React from "react";

import './IncrementDecrementButton.css'

class IncrementDecrementButton extends React.Component {
    state = {
        currentValue: 1
    }

    constructor(props) {
        super(props);

        this.state.currentValue = props.minimum
    }

    decrementValue = (event) => {
        event.preventDefault()
        let currentValue = this.state.currentValue

        if (!isNaN(currentValue) && currentValue > this.props.minimum) {
            currentValue -= 1
        } else {
            currentValue = this.props.minimum
        }

        this.setState({currentValue});
        this.props.updateCounter(event, currentValue)
    }

    incrementValue = (event) => {
        event.preventDefault()
        let currentValue = this.state.currentValue

        if (!isNaN(currentValue)) {
            if (currentValue < this.props.maximum) {
                currentValue += 1
            } else {
                currentValue = this.props.maximum
            }
        } else {
            currentValue = this.props.minimum
        }

        this.setState({currentValue});
        this.props.updateCounter(event, currentValue)
    }

    render() {
        return (
            <div className="input-group">
                <input type="button" value="-" name={this.props.name} className="button-minus" data-field="quantity" onClick={this.decrementValue}/>
                <input type="number" step="1" name={this.props.name} value={this.state.currentValue} className="quantity-field" readOnly/>
                <input type="button" value="+" name={this.props.name} className="button-plus" data-field="quantity" onClick={this.incrementValue}/>
            </div>
        )
    }
}

export default IncrementDecrementButton
