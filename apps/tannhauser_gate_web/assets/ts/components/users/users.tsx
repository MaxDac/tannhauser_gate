import React, {useEffect, useState} from "react";
import {getUsers} from "../../services/users-services";
import {checkResponse} from "../../services/error-response";
import User from "../../dtos/users/user";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers()
            .then(res => {
                if (checkResponse(res)) {
                    setUsers(res as User[])
                }
            });
    }, []);

    const rows = () => {
        const rows = [];

        for (const user of users) {
            rows.push(<li key={user.id}>{user.username}</li>);
        }

        return rows;
    }

    return (
        <ul>
            {rows()}
        </ul>
    )
}
