import React, {useEffect} from "react";
import {useHistory} from "react-router";

export interface LogoutProps {
    onLogout: () => void;
}

export default function Logout(props: LogoutProps) {
    const history = useHistory()

    useEffect(() => {
        props.onLogout()
        history.push("/")
    }, [])

    return (
        <div />
    )
}