import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Menu() {
    return (
        <Navbar className="navbar navbar-expand-lg navbar-dark" bg="dark" variant="dark">
            <Navbar.Brand href="#/">
                <img
                    alt=""
                    src="/images/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Tannhauser Gate
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#/characters">Characters</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#/login">Login</Nav.Link>
                    <Nav.Link href="#/registration">Registration</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
