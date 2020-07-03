import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./users.css";

export default function Login() {
    return (
        <Form className="users-form-container">
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" className="bg-dark text-light" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" className="bg-dark text-light" placeholder="Password" />
            </Form.Group>

            <div className="users-form-submit-button">
                <Button variant="dark" type="submit">
                    Login
                </Button>
            </div>
        </Form>
    );
}
