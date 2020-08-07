import React, {useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import CharacterSelection from "./components/characters/character-selection";
import "../css/main-app.css";

export interface MenuProps {
    logged: boolean
}

export default function Menu(props: MenuProps) {
    const toggleNavbar = () => {
        const el = document.getElementById("navbar-toggle-button");

        if (!el?.classList.contains("collapsed")) {
            el?.click();
        }
    }

    const unloggedRightMenu = () =>
        <Nav>
            <Nav.Link href="#/login" onClick={toggleNavbar}>Login</Nav.Link>
            <Nav.Link href="#/registration" onClick={toggleNavbar}>Registration</Nav.Link>
        </Nav>

    const loggedRightMenu = () =>
        <Nav>
            <CharacterSelection history={(props as any).history} />
            <Nav.Link href="#/logout" onClick={toggleNavbar}>Logout</Nav.Link>
        </Nav>;

    const rightMenu = () => props.logged ? loggedRightMenu() : unloggedRightMenu()

    return (
        <Navbar className="navbar navbar-expand-lg navbar-dark menu"
                bg="dark"
                variant="dark"
                expand="lg">
            <Navbar.Brand href="#/" onClick={toggleNavbar}>
                <img
                    alt=""
                    src="/images/logo-30x30.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle-button" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#/users" onClick={toggleNavbar}>List</Nav.Link>
                    <NavDropdown title="Character" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#/characters" onClick={toggleNavbar}>List</NavDropdown.Item>
                        <NavDropdown.Item href="#/character/new" onClick={toggleNavbar}>New</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#/chats" onClick={toggleNavbar}>Map</Nav.Link>
                </Nav>
                {rightMenu()}
            </Navbar.Collapse>
        </Navbar>
    );
}
