import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {UsersServices} from "../../services/users-services";
import {useHistory} from "react-router-dom";
import OkModal from "../base/ok-modal";
import {checkResponse} from "../../services/error-response";
import User from "../../dtos/users/user";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");

    const history = useHistory();

    const onEmailChanges = (e: any) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onPasswordChanges = (e: any) => {
        const value = e.target.value;
        setPassword(value);
    }

    const onUsernameChanges = (e: any) => {
        const value = e.target.value;
        setUsername(value);
    }

    const onFormSubmit = (e: any) => {
        UsersServices.registerUser({
            email,
            username,
            form_password: password
        })
            .then(user => {
                if (checkResponse(user) && (user as User).id !== undefined) {
                    setModalText("Character created, you will be redirected.");
                }
                else {
                    setModalText("Error while creating the character. Please contact support.");
                }

                setShowModal(true)
            });
    }

    const onPopupOk = () => {
        setShowModal(false);
        history.push("/");
    }

    return (
        <div className="users-form-container">
            <OkModal text={modalText}
                     show={showModal}
                     buttonText="Ok"
                     onOk={onPopupOk} />
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  onChange={onEmailChanges}
                                  className="bg-dark text-light" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        The registration e-mail will be received at this recipient.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"  onChange={onUsernameChanges}
                                  className="bg-dark text-light" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={onPasswordChanges}
                                  className="bg-dark text-light" placeholder="Password" />
                </Form.Group>

                <div className="users-form-submit-button">
                    <Button variant="dark" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    )
}
