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
import ChatCharacterSheet from "../characters/chat-character-sheet";
import Character from "../../dtos/characters/character";
import {CharactersServices} from "../../services/characters-services";
import {store} from "../../state";

interface ChannelContainer {
    channel?: Channel;
}

export default function ChatRoomComponent() {
    const {id} = useParams();
    const [room, setRoom] = useState<ChatRoom | undefined>();
    const [chatChannel, setChatChannel] = useState<ChannelContainer>({});
    const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();
    const [showCharacterModal, setShowCharacterModal] = useState(false);
    
    let socket = new Socket("/socket", {
        params: {token: getUserToken()},
        logger: (kind, msg, data) => {
            console.log(`${kind}: ${msg}`, data)
        }
    });

    useEffect(() => {
        getRoom(id)
            .then(r => {
                if (checkResponse(r)) {
                    setRoom(r as ChatRoom)
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
                character_id: store.getState().state?.character?.id,
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

    const openCharacterModal = (character_id: string) => {
        CharactersServices.getCharacter(character_id)
            .then(c => {
                if (checkResponse(c)) {
                    setSelectedCharacter(c as Character);
                    setShowCharacterModal(true);
                }
            })
    }

    const getChatElement = (c: ChatLog): Element => {
        const linkElement = document.createElement("a");
        linkElement.href = "javascript:void(0);";
        linkElement.onclick = () => openCharacterModal(c.character_id);
        linkElement.innerHTML = `<b>${c.character_name}</b>`;

        const linkContainerElement = document.createElement("span");
        linkContainerElement.appendChild(linkElement);

        const dateElement = document.createElement("span");
        dateElement.innerHTML = `[${showDate(c.date)}] - `;

        const textElement = document.createElement("span");
        textElement.innerHTML = `</a>: ${c.text}`;

        const element = document.createElement("div");
        element.className = "chat-log";
        element.appendChild(dateElement)
            .appendChild(linkContainerElement)
            .appendChild(textElement);

        return element;
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
            <ChatCharacterSheet character={selectedCharacter}
                                show={showCharacterModal}
                                onClose={() => setShowCharacterModal(false)} />
            <h3 style={{"padding": "3px"}}>{room?.name}</h3>
            <div id="chat-show" className="chat-show" />
            <ChatInput className="chat-input" onSubmit={onNewPhrase} />
        </div>
    )
}