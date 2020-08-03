import RegistrationUser from "../dtos/users/registration-user";
import { post } from "./base";
import User from "../dtos/users/user";
import UserCredentials from "../dtos/users/user-credentials";
import {ErrorResponse} from "../dtos/ErrorResponse";

export function registerUser(user: RegistrationUser): Promise<User> {
    return post<User>("/api/users", {
        user: user
    });
}

export function login(credentials: UserCredentials): Promise<User | ErrorResponse> {
    return post<User>("/api/login", credentials)
}
