import UserCredentials from "../dtos/users/user-credentials";
import User from "../dtos/users/user";
import {ErrorResponse} from "./error-response";
import {ServicesBase} from "./base";

export namespace AuthenticationServices {
    export function login(credentials: UserCredentials): Promise<User | ErrorResponse> {
        return ServicesBase.post<User>("/api/login", credentials)
    }

    export function logout(): Promise<any | ErrorResponse> {
        return ServicesBase.post<any>("/api/logout", {})
    }

    const UserNotLoggedError = "User not logged"
    const UserNotAuthorized = "User unauthorized"

    export function checkLoginExpired(error: ErrorResponse): boolean {
        return error.errors.length > 0 &&
            error.errors.filter(e => e === UserNotLoggedError || e === UserNotAuthorized).length > 0
    }
}