import UserCredentials from "../dtos/users/user-credentials";
import User from "../dtos/users/user";
import { ErrorResponse } from "./error-response";
export declare namespace AuthenticationServices {
    function login(credentials: UserCredentials): Promise<User | ErrorResponse>;
    function logout(): Promise<any | ErrorResponse>;
    function checkLoginExpired(error: ErrorResponse): boolean;
}
