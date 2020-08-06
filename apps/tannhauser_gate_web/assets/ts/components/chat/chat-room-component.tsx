import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {Channel, Socket} from "phoenix"
import ChatInput from "./chat-input"
import {getUserToken} from "../../helpers";
import ChatLog from "../../dtos/chats/chat-log";
import ChatRoom from "../../dtos/chats/chat-room";
import {ChatServices} from "../../services/chat-services";
import getRoom = ChatServices.getRoom;
import {checkResponse} from "../../services/error-response";

interface ChannelContainer {
    channel?: Channel;
}

export default function ChatRoomComponent() {
    const {id} = useParams()
    const [room, setRoom] = useState<ChatRoom[]>([])
    const [chatChannel, setChatChannel] = useState<ChannelContainer>({})
    
    let socket = new Socket("/socket", {
        params: {token: getUserToken()},
        logger: (kind, msg, data) => {
            console.log(`${kind}: ${msg}`, data)
        }
    })

    useEffect(() => {
        getRoom(id)
            .then(r => {
                if (checkResponse(r)) {
                    setRoom([r as ChatRoom])
                }
            })

        console.log("Connecting... ")
        socket.connect()
        const channel = socket.channel(`chats:${id}`)

        channel.on("new_chat_log", res => {
            console.log("pushing single chat", res)
            pushLogs(res)
        })

        channel.join()
            .receive("ok", ({chats}) => {
                console.log("Pushing chats")
                pushLogs(...chats)
            })
            .receive("error", reason => console.error("Error while joining the chat!", reason))

        setChatChannel({channel: channel})

    }, [])

    const onNewPhrase = (text: string) => {
        if (chatChannel.channel !== undefined) {
            chatChannel.channel.push("new_chat_log_insert", {
                chat_rooms_id: id,
                text: text
            })
                .receive("error", e => console.error("Error!", e))
        }
        else {
            console.error("Channel undefined")
        }
    }

    const showDate = (d: string) => d.split("T")[1]

    const getChatElement = (c: ChatLog): Element => {
        const element = document.createElement("div")
        element.innerHTML = `[${showDate(c.date)}] - <b>${c.character_name}</b>: ${c.text}`
        element.className = "chat-log"
        return element
    }

    const pushLogs = (...cs: ChatLog[]) => {
        let showFrame = document.getElementById("chat-show")

        if (showFrame !== undefined && showFrame !== null) {
            for (const c of cs) {
                showFrame.appendChild(getChatElement(c))
            }

            showFrame.scrollTop = showFrame.scrollHeight
        }
    }

    return (
        <div id="chat-screen">
            <h3 style={{"padding": "3px"}}>{room.length === 1 ? room[0].name : "Room"}</h3>
            <div id="chat-show" className="chat-show" />
            <ChatInput className="chat-input" onSubmit={onNewPhrase} />
        </div>
    )
}