import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {clearState, store} from "../../state";
import LoadingButton from "../base/loading-button";
import {checkResponse, ErrorResponse, getError} from "../../services/error-response";
import OkModal from "../base/ok-modal";
import User from "../../dtos/users/user";

import "./users.css";
import {reloadFromServer} from "../../helpers";
import {login} from "../../services/authentication-services";

export interface LoginProps {
    isUnauthorized?: boolean;
    onLogged: (u: User) => void;
}

export default function Login(props: LoginProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (props.isUnauthorized) {
            setErrorMessage("Login expired, please log on again.")
            setShowModal(true)
        }
    }, [props.isUnauthorized])

    const buildErrorMessage = (e: ErrorResponse) => {
        if (e.errors.length === 1) {
            return e.errors[0]
        }
        else {
            let message = "There were errors while performing login"

            for (const err of e.errors) {
                message = `${message}\r\n${err}`
            }

            return message
        }
    }

    const onEmailChanged = (e: any) => setEmail(e.target.value)

    const onPasswordChanged = (e: any) => setPassword(e.target.value)

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsWaiting(true)

        login({
            username: email,
            password: password
        })
            .then(response => {
                setIsWaiting(false)
                if (checkResponse(response)) {
                    // history.push("/")
                    props.onLogged(response as User)
                    reloadFromServer("#/")
                }
                else {
                    clearState(store)
                    const error = getError(response)
                    console.error("Error while performing login!", error)
                    setErrorMessage(buildErrorMessage(error))
                    setShowModal(true)
                }
            })
            .catch(reason => {
                setIsWaiting(false)
                clearState(store)
                console.error(reason)
            })
    }

    return (
        <div className="users-form-container">
            <OkModal text={errorMessage}
                     show={showModal}
                     buttonText="Ok"
                     onOk={() => setShowModal(false)} />
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  className="bg-dark text-light"
                                  placeholder="Enter email"
                                  onChange={onEmailChanged} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  className="bg-dark text-light"
                                  placeholder="Password"
                                  onChange={onPasswordChanged} />
                </Form.Group>

                <div className="users-form-submit-button">
                    <LoadingButton buttonText="Login" isWaiting={isWaiting} />
                </div>
            </Form>
        </div>
    );
}
