import React, {Component} from 'react';
import NavItem from './NavItem';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'NavItemActive': ''
        }
    }

    activeItem = (x) => {
        if (this.state.NavItemActive.length > 0) {
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({'NavItemActive': x}, () => {
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };

    render() {
        return (
            <nav>
                <ul>
                    <NavItem item="Home" tolink="/" activec={this.activeItem}/>
                    <NavItem item="About" tolink="/about" activec={this.activeItem}/>
                    <NavItem item="Education" tolink="/education" activec={this.activeItem}/>
                    <NavItem item="Skills" tolink="/skills" activec={this.activeItem}/>
                    <NavItem item="Contact" tolink="/contact" activec={this.activeItem}/>
                </ul>
            </nav>
        )
    }
}

export default Navbar
