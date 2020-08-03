import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

import {arrayBufferToBase64, last} from "../../helpers";

import "./file-drop.css";

export interface FileDropProps {
    title: string;
    showPreview: boolean;
    onLoad: (base64image: string) => void;
    onError?: (error: string) => void;
}

export default function FileDrop(props: FileDropProps) {
    const [validated, setValidated] = useState(false);
    const [avatar, setAvatar] = useState("")

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: any) => {
            console.log(`Reading file ${file.name}`);

            if (last(file.name.split(".")) !== "png") {
                if (props.onError !== undefined) {
                    props.onError("Wrong file extension")
                }
                return
            }

            const check: any = document.getElementById("file-check");

            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const arrayBuffer = reader.result as ArrayBuffer

                if (arrayBuffer.byteLength > 1000000) {
                    if (props.onError !== undefined) {
                        props.onError("Image too big!")
                    }

                    return
                }

                const base64Image = arrayBufferToBase64(arrayBuffer)
                props.onLoad(base64Image)

                if (props.showPreview) {
                    setAvatar(base64Image)
                }

                check.checked = true;
            }
            reader.readAsArrayBuffer(file)
        })

    }, []);

    const showActiveRegion = (text: string) => {
        return (
            <Jumbotron>
                <h3>{props.title}</h3>
                <div>
                    {text}
                </div>
            </Jumbotron>
        );
    };

    const showAvatar = () => {
        if (props.showPreview && avatar !== undefined && avatar !== "") {
            return (
                <div className="avatar-preview-container">
                    <img src={`data:image/png;base64,${avatar}`}
                         className="avatar-preview-image"
                         alt="avatar" />
                </div>
            )
        }

        return <div />
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div>
            <div className="file-drop-container">
                <div className="file-name-control">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                showActiveRegion("Release to upload.") :
                                showActiveRegion("Drag the file here (only PNG allowed...")
                        }
                    </div>
                    <Form.Group>
                        <Form.Check
                            required
                            disabled
                            id="file-check"
                            label="File uploaded!"
                            feedback="Please drop a file."
                        />
                    </Form.Group>
                </div>
            </div>
            {showAvatar()}
        </div>
    );
}
