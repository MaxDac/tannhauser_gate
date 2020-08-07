/// <reference types="react" />
import Character from "../../dtos/characters/character";
import "./characters.css";
export interface ChatCharacterSheetInterface {
    character?: Character;
    show: boolean;
    onClose: () => void;
}
export default function ChatCharacterSheet(props: ChatCharacterSheetInterface): JSX.Element;
