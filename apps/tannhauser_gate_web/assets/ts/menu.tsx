import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export interface MenuProps {
    logged: boolean
}

export default function Menu(props: MenuProps) {
    const unloggedRightMenu = () =>
        <Nav>
            <Nav.Link href="#/login">Login</Nav.Link>
            <Nav.Link href="#/registration">Registration</Nav.Link>
        </Nav>

    const loggedRightMenu = () =>
        <Nav>
            <Nav.Link href="javascript:void(0);">Welcome</Nav.Link>
            <Nav.Link href="#/logout">Logout</Nav.Link>
        </Nav>

    const rightMenu = () => props.logged ? loggedRightMenu() : unloggedRightMenu()

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
                <NavDropdown title="Character" id="basic-nav-dropdown" className="mr-auto">
                    <NavDropdown.Item href="#/characters">List</NavDropdown.Item>
                    <NavDropdown.Item href="#/character/new">New</NavDropdown.Item>
                </NavDropdown>
                {rightMenu()}
            </Navbar.Collapse>
        </Navbar>
    );
}
