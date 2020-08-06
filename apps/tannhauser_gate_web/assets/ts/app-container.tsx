import React, {useEffect, useState} from "react";
import Menu from "./menu";
import {clearState, loadUser, store} from "./state";
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from "./home";
import Login from "./components/users/login";
import Registration from "./components/users/registration";
import CharacterCreation from "./components/characters/character-creation";
import ChatRoomComponent from "./components/chat/chat-room-component";
import User from "./dtos/users/user";
import Logout from "./components/users/logout";
import Users from "./components/users/users";
import {clearCookies} from "./helpers";
import CharacterList from "./components/characters/character-list";
import CharacterSheet from "./components/characters/character-sheet";
import ChatMap from "./components/chat/chat-map";

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
                    <Route exact path="/login/unauthorized" component={() => <Login isUnauthorized={true}
                                                                                    onLogged={onLogged} />} />
                    <Route exact path="/logout" component={() => <Logout onLogout={onLogout} />} />
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/characters" component={CharacterList} />
                    <Route exact path="/character/new" component={CharacterCreation} />
                    <Route exact path="/character/:id" component={CharacterSheet} />
                    <Route exact path="/chats" component={ChatMap} />
                    <Route exact path="/chat/:id" component={ChatRoomComponent} />
                </Switch>
            </HashRouter>
        </div>
    )
}
