import RegistrationCharacter from "../dtos/characters/registration-character";
import Character from "../dtos/characters/character";
import {get, post} from "./base";
import {ErrorResponse} from "./error-response";

export function createCharacter(character: RegistrationCharacter): Promise<Character | ErrorResponse> {
    return post<Character>("/api/characters", {
        character: character
    })
}

export function listCharacters(userId: string): Promise<Character[] | ErrorResponse> {
    return get<Character[]>(`/api/characters/list/${userId}`)
}

export function getCharacter(id: string): Promise<Character | ErrorResponse> {
    return get<Character>(`/api/characters/${id}`)
}
