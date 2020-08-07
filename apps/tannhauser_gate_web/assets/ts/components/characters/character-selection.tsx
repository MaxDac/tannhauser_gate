import React, {ChangeEvent, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Character from "../../dtos/characters/character";
import {storeCharacter, store, clearState} from "../../state";
import {CharactersServices} from "../../services/characters-services";
import {checkResponse, ErrorResponse} from "../../services/error-response";

export default function CharacterSelection(props: any) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState("");

    const getCharacters = () => {
        if (store.getState().state?.user !== undefined) {
            CharactersServices.listCharacters(store.getState().state?.user.id as string)
                .then(cs => {
                    if (checkResponse(cs)) {
                        setCharacters(cs as Character[]);
                        checkCharaterInState();
                    }
                    else {
                        clearState(store);
                        window.location.href = "/login/unauthorized";
                        window.location.reload();
                    }
                });
        }
    }

    const checkCharaterInState = () => {
        if (store.getState().state?.character === undefined &&
            characters !== undefined &&
            characters.length > 0) {
            storeCharacter(store, characters[0]);
        }
    }

    useEffect(() => {
        setSelectedCharacterId(selectValue());
        getCharacters();
    }, []);

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