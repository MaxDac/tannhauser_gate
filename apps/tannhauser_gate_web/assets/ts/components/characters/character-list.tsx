import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import Character from "../../dtos/characters/character";
import {CharactersServices} from "../../services/characters-services";
import {store} from "../../state";
import {checkResponse, ErrorResponse} from "../../services/error-response";
import {Link} from "react-router-dom";
import "../../../css/main-app.css"

export default function CharacterList() {
    const [cs, setCs] = useState<Character[]>([])

    const history = useHistory()

    useEffect(() => {
        const userId = store.getState().state?.user.id

        if (userId !== undefined) {
            CharactersServices.listCharacters(userId)
                .then(css => {
                    if (checkResponse(css)) {
                        setCs(css as Character[])
                    }
                    else {
                        alert(`Error!: ${JSON.stringify(css as ErrorResponse)}`)
                    }
                })
        }
        else {
            history.push("/login")
        }

    }, [])

    const rows = () => {
        const rs = []

        for (const c of cs) {
            rs.push(
                <li key={c.id}>
                    <Link to={`character/${c.id}`}>{c.name}</Link>
                </li>
            )
        }

        return rs
    }

    return (
        <div className="app-container">
            <h3>
                Characters
            </h3>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}