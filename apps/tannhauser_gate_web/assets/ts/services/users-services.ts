import RegistrationUser from "../dtos/registration-user";
import { post } from "./base";
import User from "../dtos/user";

export function registerUser(user: RegistrationUser): Promise<User> {
    return post<User>("/api/users", {
        user: user
    });
}
