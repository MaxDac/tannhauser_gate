import RegistrationCharacter from "../dtos/characters/registration-character";
import Character from "../dtos/characters/character";
import {ServicesBase} from "./base";
import {ErrorResponse} from "./error-response";

export namespace CharactersServices {
    export function createCharacter(character: RegistrationCharacter): Promise<Character | ErrorResponse> {
        return ServicesBase.post<Character>("/api/characters", {
            character: character
        })
    }

    export function listCharacters(userId: string): Promise<Character[] | ErrorResponse> {
        return ServicesBase.get<Character[]>(`/api/characters/list/${userId}`)
    }

    export function getCharacter(id: string): Promise<Character | ErrorResponse> {
        return ServicesBase.get<Character>(`/api/characters/${id}`)
    }
}
