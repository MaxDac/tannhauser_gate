import React, {useEffect} from "react";
import {AuthenticationServices} from "../../services/authentication-services";
import {reloadFromServer} from "../../helpers";

export interface LogoutProps {
    onLogout: () => void;
}

export default function Logout(props: LogoutProps) {

    useEffect(() => {
        AuthenticationServices.logout()
            .then(_ => {
                props.onLogout()
                reloadFromServer("#/")
            })
    }, [])

    return (
        <div>Logging out... </div>
    )
}