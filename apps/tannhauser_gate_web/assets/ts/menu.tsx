import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import {store} from "./state";
import Character from "./dtos/characters/character";
import {CharactersServices} from "./services/characters-services";
import {checkResponse, ErrorResponse} from "./services/error-response";

export interface MenuProps {
    logged: boolean
}

export default function Menu(props: MenuProps) {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        if (props.logged && store.getState().state?.user !== undefined) {
            CharactersServices.listCharacters(store.getState().state?.user.id as string)
                .then(cs => {
                    if (checkResponse(cs)) {
                        setCharacters(cs as Character[]);
                    }
                    else {
                        console.error("TODO! manage error.", cs as ErrorResponse);

                    }
                });
        }
    }, []);

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
        <>
            <Form.Group controlId="characterSelect" onChange={(e: any) => console.log("changed", e)}>
                <Form.Control as="select" className="bg-dark text-white">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
            <Nav.Link href="#/logout" onClick={toggleNavbar}>Logout</Nav.Link>
        </>;

    const rightMenu = () => props.logged ? loggedRightMenu() : unloggedRightMenu()

    return (
        <Navbar className="navbar navbar-expand-lg navbar-dark"
                bg="dark"
                variant="dark"
                expand="lg">
            <Navbar.Brand href="#/" onClick={toggleNavbar}>
                <img
                    alt=""
                    src="/images/logo.png"
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
