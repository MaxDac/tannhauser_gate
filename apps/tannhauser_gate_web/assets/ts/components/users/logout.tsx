import React, {useEffect} from "react";
import {useHistory} from "react-router";
import {logout} from "../../services/users-services";

export interface LogoutProps {
    onLogout: () => void;
}

export default function Logout(props: LogoutProps) {
    const history = useHistory()

    useEffect(() => {
        logout()
            .then(_ => {
                props.onLogout()
                history.push("/")
            })
    }, [])

    return (
        <div>Logging out... </div>
    )
}