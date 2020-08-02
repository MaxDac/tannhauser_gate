import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export interface ChatInputProps {
    onSubmit: (text: string) => void;
}

export default function ChatInput(props: ChatInputProps) {
    const [text, setText] = useState("")

    const onTextChanged = (e: any) => {
        setText(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // To stop reloading the page
        e.preventDefault()
        props.onSubmit(text)
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="chat-input">
                <Form.Label>Phrase</Form.Label>
                <Form.Control type="text" 
                              onChange={onTextChanged}
                              placeholder="Enter action text here" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
