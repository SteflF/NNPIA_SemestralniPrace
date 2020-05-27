import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import {Component} from "react";

export const PrivateRoute = ({component: Component, ... rest}) => (
    <Route
        {...rest}
        render={ props =>
            localStorage.getItem("userInfo") ? (<Component {...props}/>) : (<Redirect to={{pathname: "/", state: {from: props.location}}}/>)}
    />
);
