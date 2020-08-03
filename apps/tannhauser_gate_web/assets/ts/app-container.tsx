import React, {useEffect, useState} from "react";
import Menu from "./menu";
import {clearState, loadUser, store} from "./state";
import {HashRouter, Route, Switch, useHistory} from "react-router-dom";
import Home from "./home";
import Login from "./users/login";
import Registration from "./users/registration";
import CharactersList from "./characters/characters-list";
import CharacterCreation from "./characters/character-creation";
import ChatRoom from "./chat/chat-room";
import User from "./dtos/users/user";
import Logout from "./users/logout";

export default function AppContainer() {
    const [logged, setLogged] = useState(false)

    const history = useHistory()

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
                    <Route exact path="/characters" component={CharactersList} />
                    <Route exact path="/character/new" component={CharacterCreation} />
                    <Route exact path="/chat/:id" component={ChatRoom} />
                </Switch>
            </HashRouter>
        </div>
    )
}
