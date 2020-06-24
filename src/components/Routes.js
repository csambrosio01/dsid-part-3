import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Air from "../contents/Air";
import CarRental from "../contents/CarRental";
import Hotel from "../contents/Hotel";
import Home from "../contents/Home";
import CreateUser from "../contents/user/CreateUser";
import Login from "../contents/user/Login";

const Routes = () => (
    <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/air" component={Air}/>
        <Route exact path="/hotel" component={Hotel}/>
        <Route exact path="/car-rental" component={CarRental}/>
        <Route exact path="/create-user" component={CreateUser}/>
        <Route exact path="/login" component={Login}/>
    </Router>
)

export default Routes
