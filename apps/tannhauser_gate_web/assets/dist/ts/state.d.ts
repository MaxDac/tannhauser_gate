import User from "./dtos/users/user";
import UserState from "./dtos/users/user-state";
import Character from "./dtos/characters/character";
import { Store } from "redux";
interface Action<T> {
    type: string;
    payload?: T;
}
interface StateContainer<T> {
    state?: T;
}
export declare const store: Store<StateContainer<UserState>, Action<any>>;
export declare function loadUser(store: Store<StateContainer<UserState>, Action<any>>, user: User): void;
export declare function storeCharacter(store: Store<StateContainer<UserState>, Action<any>>, c: Character): void;
export declare function clearState(store: Store<StateContainer<UserState>>): void;
export {};
