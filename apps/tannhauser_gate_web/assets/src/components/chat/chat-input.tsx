import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./chat.css"

export interface ChatInputProps {
    onSubmit: (text: string) => void;
    className?: string;
}

export default function ChatInput(props: ChatInputProps) {
    const [text, setText] = useState("")

    const onTextChanged = (e: any) => {
        setText(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // To stop reloading the page
        e.preventDefault();
        const btn = document.getElementById("submit-text");

        if (btn !== undefined) {
            (btn as any).value = "";
        }

        props.onSubmit(text);
    }

    return (
        <Form className={props.className} onSubmit={onSubmit}>
            <Container>
                <Row>
                    <Col xs="9" md="10">
                        <Form.Group controlId="submit-text">
                            <Form.Control type="text"
                                          onChange={onTextChanged}
                                          className="bg-dark text-white"
                                          placeholder="Enter action text here" />
                        </Form.Group>
                    </Col>
                    <Col xs="3" md="2">
                        <Button variant="dark"
                                type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}
