import React, {useEffect, useState} from "react";
import Alert from "react-bootstrap/Alert"

export interface ErrorAlertProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

export default function ErrorAlert(props: ErrorAlertProps) {
    let timeoutRef: number = 0;

    const onClose = () => {
        if (timeoutRef !== 0) {
            clearTimeout(timeoutRef)
        }

        props.onClose();
    }

    useEffect(() => {
        if (props.show) {
            timeoutRef = setTimeout(onClose, 5000)
        }
    }, [])

    const showError = () => {
        if (props.show) {
            return (
                <Alert variant="dark" onClose={onClose} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                        {props.message}
                    </p>
                </Alert>
            )
        }
        else {
            return <div />
        }
    }

    return showError()
}
