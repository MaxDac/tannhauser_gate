import RegistrationCharacter from "../dtos/characters/registration-character";
import Character from "../dtos/characters/character";
import { post } from "./base";

export function registerCharacter(character: RegistrationCharacter): Promise<Character> {
    return post<Character>("/api/characters", {
        character: character
    })
}