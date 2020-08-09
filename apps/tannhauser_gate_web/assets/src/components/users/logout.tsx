import React, {useEffect} from "react";
import {reloadFromServer} from "../../helpers";
import {logout} from "../../services/authentication-services";

export interface LogoutProps {
    onLogout: () => void;
}

export default function Logout(props: LogoutProps) {

    useEffect(() => {
        logout()
            .then(_ => {
                props.onLogout()
                reloadFromServer("#/")
            })
    }, [])

    return (
        <div>Logging out... </div>
    )
}