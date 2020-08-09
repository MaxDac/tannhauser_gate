import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export interface OkModalParams {
    text: string;
    show: boolean;
    buttonText: string;
    onOk: () => void;
}

export default function OkModal(params: OkModalParams) {
    const handleClose = () => {
        params.onOk();
    }

    return (
        <Modal show={params.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>{params.text}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    {params.buttonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
