import React, {Component} from 'react';
import ReactTypingEffect from 'react-typing-effect';
import profilePic from '../images/caio.jpeg';
import Social from '../components/Social'

class Home extends Component {
    render() {
        return (
            <div className="condiv home">
                <img src={profilePic} className="profilePic" alt="Caio's picture"/>
                <ReactTypingEffect className="typingEffect" text={['I am Caio Ambrosio', 'I am a web developer']}
                                   speed={100} eraseDelay={700}/>
                <Social/>
            </div>
        )
    }
}

export default Home
