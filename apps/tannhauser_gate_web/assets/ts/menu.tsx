import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {store} from "./state";

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
            <Nav.Item>Welcome {store.getState().state?.user?.username ?? ""}</Nav.Item>
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
                <Nav.Link href="#/users">List</Nav.Link>
                <NavDropdown title="Character" id="basic-nav-dropdown" className="mr-auto">
                    <NavDropdown.Item href="#/characters">List</NavDropdown.Item>
                    <NavDropdown.Item href="#/character/new">New</NavDropdown.Item>
                </NavDropdown>
                {rightMenu()}
            </Navbar.Collapse>
        </Navbar>
    );
}
