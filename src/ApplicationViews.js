import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Home  from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";

export const ApplicationViews = (props) => {

    return (
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Switch>
    );
};