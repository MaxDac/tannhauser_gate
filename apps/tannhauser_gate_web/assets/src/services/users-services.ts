import RegistrationUser from "../dtos/users/registration-user";
import User from "../dtos/users/user";
import {ErrorResponse} from "./error-response";
import {get, post} from "./base";

export function registerUser(user: RegistrationUser): Promise<User | ErrorResponse> {
    return post<User>("/users", {
        user: user
    });
}

export function getUsers(): Promise<User[] | ErrorResponse> {
    return get<User[]>("/users")
}
