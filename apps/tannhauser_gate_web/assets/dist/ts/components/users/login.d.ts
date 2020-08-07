/// <reference types="react" />
import User from "../../dtos/users/user";
import "./users.css";
export interface LoginProps {
    isUnauthorized?: boolean;
    onLogged: (u: User) => void;
}
export default function Login(props: LoginProps): JSX.Element;
