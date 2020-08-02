import React from "react";
import {HashRouter} from "react-router-dom";
import {Switch, Route} from "react-router-dom";

import "../css/main-app.css";
import Home from "./home";
import CharactersList from "./characters/characters-list";
import Login from "./users/login";
import Registration from "./users/registration";
import ChatRoom from "./chat/chat-room";

export default function MainApp() {
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/characters" component={CharactersList} />
                <Route exact path="/chat/:id" component={ChatRoom} />
            </Switch>
        </HashRouter>
    )
}
