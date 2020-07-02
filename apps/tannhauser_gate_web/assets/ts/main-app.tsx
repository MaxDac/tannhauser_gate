import React from "react";
import {HashRouter} from "react-router-dom";
import {Switch, Route} from "react-router-dom";

import "../css/main-app.css";
import Home from "./home";

export default function MainApp() {
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}
