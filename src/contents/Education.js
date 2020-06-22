import React, {Component} from "react";
import WideCard from "../components/WideCard";

class Education extends Component {
    render() {
        return(
            <div className="condiv">
                <h1 className="subtopic">My Education</h1>
                <WideCard title="Software Engineering" where="São Paulo University" from="January 2018" to="Present"/>
                <WideCard title="SSLC | HLC" where="ETEC Presidente Vargas" from="January 2015" to="December 2017"/>
            </div>
        )
    }
}

export default Education
