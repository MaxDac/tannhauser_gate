import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export interface LoadingButtonProps {
    buttonText: string;
    isWaiting: boolean;
}

export default function LoadingButton(props: LoadingButtonProps) {
    const normalButton = () =>
        <Button variant="dark" type="submit">
            {props.buttonText}
        </Button>

    const waitingButton = () =>
        <Button variant="dark" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>

    const showButton = () => {
        if (props.isWaiting) {
            return waitingButton();
        }
        else {
            return normalButton();
        }
    }

    return (
        <div>
            {showButton()}
        </div>
    )
}
