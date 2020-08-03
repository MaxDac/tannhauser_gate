import User from "./dtos/users/user";
import UserState from "./dtos/users/user-state";
import Character from "./dtos/characters/character";
import {
    createStore,
    Reducer,
    PreloadedState,
    applyMiddleware,
    Dispatch,
    Store} from "redux";

// Types

interface Action<T> {
    type: string;
    payload?: T;
}

// Actions

const loadUserAction: (_: User) => Action<User> = (u: User) => {
    return {
        type: 'LOAD_USER',
        payload: u
    }
}

const loadCharacterAction: (_: Character) => Action<Character> =
    (c: Character) => {
        return {
            type: 'LOAD_CHARACTER',
            payload: c
        }
    }

const clearAction: Action<any> = {
    type: 'CLEAR_STATE'
}

interface StateContainer<T> {
    state?: T
}

// reducer

const reducer: Reducer<StateContainer<UserState>, Action<any>> =
    (state, action) => {
        let currentState: StateContainer<UserState> = {}
        switch (action.type) {
            case 'LOAD_USER':
                return {
                    state: {
                        user: action.payload as User
                    }
                }
            case 'LOAD_CHARACTER':
                return {
                    state: {
                        user: state?.state?.user as User,
                        character: action.payload as Character
                    }
                }
            default:
                return {} as StateContainer<UserState>
        }
    }

// Instantiation

export const store = rehydrateStore()

// Rehydration from sessionStorage

function persistMiddleware({ getState }: any) {
    return (next: Dispatch<Action<any>>) => (action: Action<StateContainer<UserState>>) => {
        const returnValue = next(action) as StateContainer<UserState>

        console.log(`State - returnValue`, returnValue)
        console.log(`Action type: ${action.type}`)

        if (action.type === 'CLEAR_STATE') {
            clearPersistedState()
        }
        else {
            persistState(returnValue)
        }

        return returnValue
    }
}

function rehydrateStore() {
    const serializedState = sessionStorage.getItem("user-state")

    if (serializedState === undefined || serializedState === "") {
        return createStore(reducer)
    }

    const state = JSON.parse(serializedState as string) as StateContainer<UserState>

    return createStore(reducer, state as PreloadedState<StateContainer<UserState>>,
        applyMiddleware(persistMiddleware))
}

function persistState(state: StateContainer<UserState>) {
    clearPersistedState()
    sessionStorage.setItem("user-state", JSON.stringify(state))
}

function clearPersistedState() {
    sessionStorage.clear()
}

export function loadUser(store: Store<StateContainer<UserState>, Action<any>>, user: User) {
    store.dispatch({
        type: 'LOAD_USER',
        user
    })
}

export function loadCharacter(store: Store<StateContainer<UserState>, Action<any>>, c: Character) {
    store.dispatch({
        type: 'LOAD_CHARACTER',
        c
    })
}

export function clearState(store: Store<StateContainer<UserState>>) {
    store.dispatch({
        type: 'CLEAR_STATE'
    })
}
