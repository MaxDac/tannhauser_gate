import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FileDrop from "../base/file-drop";
import LoadingButton from "../base/loading-button";
import {store} from "../../state";
import {checkResponse, ErrorResponse, formatError} from "../../services/error-response";
import {createCharacter} from "../../services/characters-services";
import {useHistory} from "react-router";
import ErrorAlert from "../base/error-alert";
import "../../css/main-app.css"
import OkModal from "../base/ok-modal";

export default function CharacterCreation() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState("")
    const [avatar, setAvatar] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const modalText = "Character created, you will now be redirected.";

    const history = useHistory();

    const onNameChanged = (e: any) => {
        const value = e.target.value
        setName(value)
    }

    const onDescriptionChanged = (e: any) => {
        const value = e.target.value
        setDescription(value)
    }

    const onNotesChanged = (e: any) => {
        const value = e.target.value
        setNotes(value)
    }

    const showError = (error: string) => {
        console.error("Shoring error!", error);
        setErrorMessage(error);
        setShowErrorMessage(true);
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsWaiting(true)

        createCharacter({
            user_id: store.getState().state?.user.id as string,
            name: name,
            description: description,
            notes: notes,
            avatar: avatar
        })
            .then(res => {
                if (!checkResponse(res)) {
                    showError(formatError(res as ErrorResponse, "Error while creating character!"));
                }

                setIsWaiting(false);
                setShowModal(true);
            })
    }

    const onPopupOk = () => {
        setShowModal(false);
        history.push("/");
        document.location.reload();
    }

    const onErrorClose = () => {
        console.log("closing...");
        setShowErrorMessage(false);
    }

    return (
        <div className="app-container">
            <ErrorAlert message={errorMessage}
                        show={showErrorMessage}
                        onClose={onErrorClose} />
            <OkModal text={modalText}
                     show={showModal}
                     buttonText="Ok"
                     onOk={onPopupOk} />
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  onChange={onNameChanged}
                                  className="bg-dark text-light"
                                  placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea"
                                  onChange={onDescriptionChanged}
                                  className="bg-dark text-light"
                                  placeholder="Description" />
                </Form.Group>

                <Form.Group controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="textarea"
                                  onChange={onNotesChanged}
                                  className="bg-dark text-light"
                                  placeholder="Notes" />
                </Form.Group>

                <div className="avatar-container">
                    <FileDrop title="Avatar upload"
                              showPreview={true}
                              onLoad={setAvatar}
                              onError={showError} />
                </div>

                <LoadingButton buttonText="Submit" isWaiting={isWaiting} />
            </Form>
        </div>
    )
}
