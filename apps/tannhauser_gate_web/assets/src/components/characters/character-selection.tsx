import React, {ChangeEvent, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Character from "../../dtos/characters/character";
import {storeCharacter, store, clearState} from "../../state";
import {checkResponse} from "../../services/error-response";
import {listCharacters} from "../../services/characters-services";

export default function CharacterSelection() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState("");
    const [loggedUserId, _] = useState(store.getState().state?.user?.id);

    const loggedRightMenuSelectOptions = () => {
        if (characters !== undefined) {
            return characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>);
        }

        return <option/>;
    }

    const selectValue = () => {
        const selectedCharacter = store.getState().state?.character;
        if (selectedCharacter !== undefined) {
            return selectedCharacter.id;
        }
        else if (characters !== undefined && characters.length > 0) {
            return characters[0].id;
        }

        return "";
    }

    useEffect(() => {
        // setSelectedCharacterId(selectValue());

        const checkCharacterInState = () => {
            if (store.getState().state?.character === undefined &&
                characters !== undefined &&
                characters.length > 0) {
                storeCharacter(store, characters[0]);
            }
        }

        if (loggedUserId !== undefined) {
            listCharacters(loggedUserId as string)
                .then(cs => {
                    if (checkResponse(cs)) {
                        setCharacters(cs as Character[]);
                        checkCharacterInState();
                    }
                    else {
                        clearState(store);
                        window.location.href = "/login/unauthorized";
                        window.location.reload();
                    }
                });
        }
    }, [loggedUserId]);

    const onCharacterChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selected = characters.filter(c => `${c.id}` === selectedId);
        storeCharacter(store, selected[0]);
        setSelectedCharacterId(selectValue());
    }

    return (
        <Form.Control as="select"
                      onChange={onCharacterChanged}
                      value={selectedCharacterId}
                      className="bg-dark text-white">
            {loggedRightMenuSelectOptions()}
        </Form.Control>
    );
}