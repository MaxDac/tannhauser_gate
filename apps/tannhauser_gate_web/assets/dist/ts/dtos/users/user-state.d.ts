import User from "./user";
import Character from "../characters/character";
export default interface UserState {
    user: User;
    character?: Character;
}
