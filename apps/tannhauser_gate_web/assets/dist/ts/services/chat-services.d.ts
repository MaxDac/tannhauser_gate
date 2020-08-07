import ChatRoom from "../dtos/chats/chat-room";
import { ErrorResponse } from "./error-response";
export declare namespace ChatServices {
    function getRooms(): Promise<ChatRoom[] | ErrorResponse>;
    function getRoom(id: string): Promise<ChatRoom | ErrorResponse>;
}
