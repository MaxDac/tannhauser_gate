import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Character from "../../dtos/characters/character";
import "./characters.css";

export interface ChatCharacterSheetInterface {
    character?: Character;
    show: boolean;
    onClose: () => void;
}

export default function ChatCharacterSheet(props: ChatCharacterSheetInterface) {
    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => props.onClose()}
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.character?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <img src={`data:image/png;base64,${props.character?.avatar}`}
                                 className="sheet-avatar-image"
                                 alt="avatar" />
                        </Col>
                        <Col xs={12} md={8}>
                            {props.character?.description}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-dark" onClick={props.onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}