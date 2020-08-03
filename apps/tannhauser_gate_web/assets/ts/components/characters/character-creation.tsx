import React, { useState } from 'react'
import "../../../css/main-app.css"
import Form from 'react-bootstrap/Form'
import FileDrop from "../base/file-drop";
import LoadingButton from "../base/loading-button";
import {createCharacter} from "../../services/characters-services";
import {store} from "../../state";
import {checkResponse, ErrorResponse} from "../../services/error-response";

export default function CharacterCreation() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState("")
    const [avatar, setAvatar] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)

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
                    alert(`Error! ${JSON.stringify((res as ErrorResponse).errors)}`)
                }

                setIsWaiting(false)
            })
    }

    return (
        <div className="app-container">
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
                    <FileDrop title="Avatar upload" showPreview={true} onLoad={setAvatar} />
                </div>

                <LoadingButton buttonText="Submit" isWaiting={isWaiting} />
            </Form>
        </div>
    )
}
