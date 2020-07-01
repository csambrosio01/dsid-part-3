import React from "react";
import AirportService from "../../../app/AirportService";

class SearchInput extends React.Component {
    state = {
        options: []
    }

    constructor(props) {
        super(props);
        this.airportService = new AirportService();
    }

    onTextChange = (event) => {
        const value = event.target.value
        if (value.length >= 3) {
            this.airportService.searchCityOrAirport(value)
                .then(response => {
                    this.setState({options: response.data})
                })
        } else {
            this.setState({options: []})
        }

        let valueCode = value.length > 3 ? value.slice(0, 3) : value
        this.state.options.forEach(option => {
            if (option.name === value) {
                valueCode = option.iataCode
            }
        })
        this.props.onTextChange(event, valueCode)
    }

    render() {
        return (
            <div className="input-icons">
                <i className={this.props.icon}/>
                <input
                    className="input-field"
                    type="search"
                    name={this.props.name}
                    list={this.props.placeholder}
                    onChange={this.onTextChange}
                    placeholder={this.props.placeholder}/>
                <datalist id={this.props.placeholder}>
                    {this.state.options.map(option => {
                        return (
                            <option value={option.name} key={option.id}>{option.subType}</option>
                        )
                    })}
                </datalist>
            </div>
        )
    }
}

export default SearchInput;
