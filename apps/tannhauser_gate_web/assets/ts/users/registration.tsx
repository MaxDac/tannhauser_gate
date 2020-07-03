import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {registerUser} from "../services/users-services";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        registerUser({
            email,
            username,
            form_password: password
        })
            .then(user => alert(JSON.stringify(user)));
    }

    return (
        <Form className="users-form-container" onSubmit={onFormSubmit}>
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
    )
}
