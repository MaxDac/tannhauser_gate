import UserCredentials from "../dtos/users/user-credentials";
import User from "../dtos/users/user";
import {ErrorResponse} from "./error-response";
import {post} from "./base";

export function login(credentials: UserCredentials): Promise<User | ErrorResponse> {
    return post<User>("/api/login", credentials)
}

export function logout(): Promise<any | ErrorResponse> {
    return post<any>("/api/logout", {})
}

const UserNotLoggedError = "User not logged"
const UserNotAuthorized = "User unauthorized"

export function isLoginExpired(error: ErrorResponse): boolean {
    return error.errors.length > 0 &&
        error.errors.filter(e => e === UserNotLoggedError || e === UserNotAuthorized).length > 0
}