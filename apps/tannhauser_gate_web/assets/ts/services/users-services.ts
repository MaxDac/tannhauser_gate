import RegistrationUser from "../dtos/users/registration-user";
import {ServicesBase} from "./base";
import User from "../dtos/users/user";
import {ErrorResponse} from "./error-response";

export namespace UsersServices {
    export function registerUser(user: RegistrationUser): Promise<User | ErrorResponse> {
        return ServicesBase.post<User>("/api/users", {
            user: user
        });
    }

    export function getUsers(): Promise<User[] | ErrorResponse> {
        return ServicesBase.get<User[]>("/api/users")
    }
}
