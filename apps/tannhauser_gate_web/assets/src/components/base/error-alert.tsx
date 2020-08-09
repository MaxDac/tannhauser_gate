import React, {useEffect, useRef} from "react";
import Alert from "react-bootstrap/Alert";

export interface ErrorAlertProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

export default function ErrorAlert(props: ErrorAlertProps) {
    const timeoutRef = useRef(undefined as NodeJS.Timeout | undefined);

    const onClose = () => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current)
        }

        props.onClose();
    }

    useEffect(() => {
        if (props.show) {
            timeoutRef.current = setTimeout(onClose, 5000)
        }
    })

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
