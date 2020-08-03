import React, {useEffect} from "react";
import {useHistory} from "react-router";
import {AuthenticationServices} from "../../services/authentication-services";

export interface LogoutProps {
    onLogout: () => void;
}

export default function Logout(props: LogoutProps) {
    const history = useHistory()

    useEffect(() => {
        AuthenticationServices.logout()
            .then(_ => {
                props.onLogout()
                history.push("/")
            })
    }, [])

    return (
        <div>Logging out... </div>
    )
}