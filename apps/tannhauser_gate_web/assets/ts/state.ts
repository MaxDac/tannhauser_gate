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
import {clone} from "./helpers";

// Types

interface Action<T> {
    type: string;
    payload?: T;
}

interface StateContainer<T> {
    state?: T
}

// reducer

const reducer: Reducer<StateContainer<UserState>, Action<any>> =
    (state: StateContainer<UserState> | undefined, action: Action<any>): StateContainer<UserState> => {
        switch (action.type) {
            case 'LOAD_USER':
                return {
                    state: {
                        user: clone(action.payload as User) as User
                    }
                }
            case 'LOAD_CHARACTER':
                return {
                    state: {
                        user: clone(state?.state?.user as User) as User,
                        character: clone(action.payload as Character)
                    }
                }
            case 'CLEAR_STATE':
                return {} as StateContainer<UserState>
            default:
                return state || {}
        }
    }

// Instantiation

export const store = rehydrateStore()

// Rehydration from sessionStorage

function persistMiddleware({ getState }: any) {
    return (next: Dispatch<Action<any>>) => (action: Action<StateContainer<UserState>>) => {
        const returnValue = next(action) as Action<StateContainer<UserState>>

        // Recreating state
        const oldState = getState()
        const newState = reducer(oldState, returnValue)

        if (action.type === 'CLEAR_STATE') {
            clearPersistedState()
        }
        else {
            persistState(newState)
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
    return createStore(reducer, state as PreloadedState<StateContainer<UserState>>, applyMiddleware(persistMiddleware))
}

function persistState(state: StateContainer<UserState>) {
    clearPersistedState()
    sessionStorage.setItem("user-state", JSON.stringify(state))
}

function clearPersistedState() {
    sessionStorage.clear()
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

export function loadUser(store: Store<StateContainer<UserState>, Action<any>>, user: User) {
    store.dispatch(loadUserAction(user))
}

export function storeCharacter(store: Store<StateContainer<UserState>, Action<any>>, c: Character) {
    store.dispatch(loadCharacterAction(c))
}

export function clearState(store: Store<StateContainer<UserState>>) {
    store.dispatch(clearAction)
}
