import ChatRoom from "../dtos/chats/chat-room";
import {ErrorResponse} from "./error-response";
import {get} from "./base";

export function getRooms(): Promise<ChatRoom[] | ErrorResponse> {
    return get<ChatRoom[]>("/api/rooms");
}

export function getRoom(id: string): Promise<ChatRoom | ErrorResponse> {
    return get<ChatRoom>(`/api/rooms/${id}`);
}