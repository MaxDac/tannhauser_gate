import RegistrationCharacter from "../dtos/characters/registration-character";
import Character from "../dtos/characters/character";
import { ErrorResponse } from "./error-response";
export declare namespace CharactersServices {
    function createCharacter(character: RegistrationCharacter): Promise<Character | ErrorResponse>;
    function listCharacters(userId: string): Promise<Character[] | ErrorResponse>;
    function getCharacter(id: string): Promise<Character | ErrorResponse>;
}
