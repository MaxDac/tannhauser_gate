import React from "react"
import { useParams } from "react-router-dom"
import { Socket } from "phoenix"
import ChatInput from "./chat-input"

export default function ChatRoom() {
    const {id} = useParams()
    
    let socket = new Socket("/socket", {
        params: {token: (window as any).userToken},
        logger: (kind, msg, data) => {
            console.log(`${kind}: ${msg}`, data)
        }
    })

    const init = (socket: Socket, element: any) => {
        console.log("Connecting... ")
        socket.connect()
        const chatChannel = socket.channel(`chats:${id}`)
        chatChannel.join()
            .receive("ok", res => console.log("joined the chat!", res))
            .receive("error", reason => console.error("Error while joining the chat!", reason))
    }

    init(socket, document.getElementById("chat-screen"))

    return (
        <div id="chat-screen">
            Chateau {id}
            <ChatInput onSubmit={text => console.log(`received ${text}`)} />
        </div>
    )
}