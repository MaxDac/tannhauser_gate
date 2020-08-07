import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router";
import Character from "../../dtos/characters/character";
import {CharactersServices} from "../../services/characters-services";
import {checkResponse, ErrorResponse, formatError} from "../../services/error-response";
import ErrorAlert from "../base/error-alert";
import {AuthenticationServices} from "../../services/authentication-services";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../css/main-app.css";
import "./characters.css";

interface SheetCharacter {
    character?: Character
}

export default function CharacterSheet() {
    const {id} = useParams()
    const history = useHistory()
    const [character, setCharacter] = useState<SheetCharacter>({})
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        CharactersServices.getCharacter(id)
            .then(c => {
                if (checkResponse(c)) {
                    setCharacter({character: c as Character})
                }
                else {
                    if (AuthenticationServices.checkLoginExpired(c as ErrorResponse)) {
                        history.push("/login/unauthorized")
                    }

                    setError(formatError(c as ErrorResponse, "Cannot load character sheet"))
                    setShowError(true)
                }
            })
    }, [])

    const onErrorClose = () => {
        setShowError(false)
    }

    const characterAvatar = () => {
        if (character.character !== undefined) {
            return (
                <div className="sheet-avatar-container">
                    <img src={`data:image/png;base64,${character.character.avatar}`}
                         className="sheet-avatar-image"
                         alt="avatar" />
                </div>
            )
        }
        else {
            return <div />
        }
    }

    return (
        <div className="app-container">
            <ErrorAlert message={error} show={showError} onClose={onErrorClose} />
            <h3>{character.character?.name}</h3>
            <div>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            {characterAvatar()}
                        </Col>
                        <Col xs={12} md={8}>
                            {character.character?.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {character.character?.notes}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
