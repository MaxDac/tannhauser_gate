import RegistrationUser from "../dtos/users/registration-user";
import User from "../dtos/users/user";
import { ErrorResponse } from "./error-response";
export declare namespace UsersServices {
    function registerUser(user: RegistrationUser): Promise<User | ErrorResponse>;
    function getUsers(): Promise<User[] | ErrorResponse>;
}
