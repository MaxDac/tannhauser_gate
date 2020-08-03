import RegistrationUser from "../dtos/users/registration-user";
import {get, post} from "./base";
import User from "../dtos/users/user";
import UserCredentials from "../dtos/users/user-credentials";
import {ErrorResponse} from "./error-response";

export function registerUser(user: RegistrationUser): Promise<User | ErrorResponse> {
    return post<User>("/api/users", {
        user: user
    });
}

export function getUsers(): Promise<User[] | ErrorResponse> {
    return get<User[]>("/api/users")
}

export function login(credentials: UserCredentials): Promise<User | ErrorResponse> {
    return post<User>("/api/login", credentials)
}

export function logout(): Promise<any | ErrorResponse> {
    return post<any>("/api/logout", {})
}
