import React, {useEffect, useState} from "react";
import Menu from "./menu";
import {clearState, loadUser, store} from "./state";
import {HashRouter, Route, Switch, useHistory} from "react-router-dom";
import Home from "./home";
import Login from "./components/users/login";
import Registration from "./components/users/registration";
import CharactersList from "./components/characters/characters-list";
import CharacterCreation from "./components/characters/character-creation";
import ChatRoom from "./components/chat/chat-room";
import User from "./dtos/users/user";
import Logout from "./components/users/logout";
import Users from "./components/users/users";
import {clearCookies} from "./helpers";

export default function AppContainer() {
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const state = store.getState()

        if (state !== undefined && state.state !== undefined) {
            setLogged(true)
        }
    }, [])

    const onLogged = (user: User) => {
        loadUser(store, user)
        setLogged(true)
    }

    const onLogout = () => {
        clearState(store)
        clearCookies()
        setLogged(false)
    }

    return (
        <div>
            <Menu logged={logged} />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={() => <Login onLogged={onLogged} />} />
                    <Route exact path="/logout" component={() => <Logout onLogout={onLogout} />} />
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/characters" component={CharactersList} />
                    <Route exact path="/character/new" component={CharacterCreation} />
                    <Route exact path="/chat/:id" component={ChatRoom} />
                </Switch>
            </HashRouter>
        </div>
    )
}
