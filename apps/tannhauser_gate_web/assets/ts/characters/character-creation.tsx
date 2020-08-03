import React, { useState } from 'react'
import "../../css/main-app.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function CharacterCreation() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState("")

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
        
    }

    return (
        <div className="app-container">
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" className="bg-dark text-light" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" className="bg-dark text-light" placeholder="Description" />
                </Form.Group>

                <Form.Group controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="textarea" className="bg-dark text-light" placeholder="Notes" />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
