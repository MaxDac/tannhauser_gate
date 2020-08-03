import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {useHistory} from "react-router";
import {login} from "../services/users-services";
import {clearState, loadUser, store} from "../state";
import LoadingButton from "../base/loading-button";

import "./users.css";
import {checkResponse, ErrorResponse, getError} from "../dtos/ErrorResponse";
import OkModal from "../modals/ok-modal";
import User from "../dtos/users/user";

export interface LoginProps {
    onLogged: (u: User) => void;
}

export default function Login(props: LoginProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    const history = useHistory()

    const buildErrorMessage = (e: ErrorResponse) => {
        if (e.errors.length === 1) {
            return e.errors[0];
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
                console.log("Login response", response)
                if (checkResponse(response)) {
                    history.push("/")
                    props.onLogged(response as User)
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
