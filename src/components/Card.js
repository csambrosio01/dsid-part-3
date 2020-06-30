import React from "react";

function Card(props) {
    return (
        <div className="py-3">
            <div className="card">
                <div className="card-header">
                    {props.header}
                </div>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Card;
