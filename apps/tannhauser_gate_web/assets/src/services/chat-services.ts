import ChatRoom from "../dtos/chats/chat-room";
import {ErrorResponse} from "./error-response";
import {get} from "./base";

export function getRooms(): Promise<ChatRoom[] | ErrorResponse> {
    return get<ChatRoom[]>("/rooms");
}

export function getRoom(id: string): Promise<ChatRoom | ErrorResponse> {
    return get<ChatRoom>(`/rooms/${id}`);
}