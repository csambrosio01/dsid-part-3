import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Air from "../contents/home/Air";
import Hotel from "../contents/home/Hotel";
import Home from "../contents/home/Home";
import CreateUser from "../contents/user/CreateUser";
import Login from "../contents/user/Login";
import RecoverCredentials from "../contents/user/RecoverCredentials";
import NotFound from "../contents/notFound/NotFound";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/air" component={Air}/>
            <Route exact path="/hotel" component={Hotel}/>
            <Route exact path="/create-user" component={CreateUser}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/recover-credentials" component={RecoverCredentials}/>
            <Route path="/404" component={NotFound}/>
            <Redirect to="/404"/>
        </Switch>
    </Router>
)

export default Routes
