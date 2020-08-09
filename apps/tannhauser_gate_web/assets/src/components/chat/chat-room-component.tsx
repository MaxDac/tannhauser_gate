import React, {useEffect, useRef, useState} from "react"
import { useParams } from "react-router-dom"
import {Channel, Socket} from "phoenix"
import ChatInput from "./chat-input"
import ChatLog from "../../dtos/chats/chat-log";
import ChatRoom from "../../dtos/chats/chat-room";
import {checkResponse} from "../../services/error-response";
import ChatCharacterSheet from "../characters/chat-character-sheet";
import Character from "../../dtos/characters/character";
import {store} from "../../state";
import {useHistory} from "react-router";
import {getRoom} from "../../services/chat-services";
import {getCharacter} from "../../services/characters-services";
import {getUserToken} from "../../services/authentication-services";
import {CodeResponse} from "../../dtos/code-response";
import {socketUrl} from "../../services/base";

export default function ChatRoomComponent() {
    const {id} = useParams();
    const [room, setRoom] = useState<ChatRoom | undefined>();
    const [chatChannel, setChatChannel] = useState<Channel | undefined>();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();
    const [showCharacterModal, setShowCharacterModal] = useState(false);

    const socket = useRef(undefined as Socket | undefined);

    const history = useHistory();

    const onNewPhrase = (text: string) => {
        if (chatChannel !== undefined) {
            chatChannel.push("new_chat_log_insert", {
                character_id: store.getState().state?.character?.id,
                chat_rooms_id: id,
                text: text
            })
                .receive("error", e => console.error("Error!", e))
        }
        else {
            console.error("Channel undefined")
        }
    };

    useEffect(() => {
        const showDate = (d: string) => d.split("T")[1];

        const openCharacterModal = (character_id: string) => {
            getCharacter(character_id)
                .then(c => {
                    if (checkResponse(c)) {
                        setSelectedCharacter(c as Character);
                        setShowCharacterModal(true);
                    }
                })
        };

        const getChatElement = (c: ChatLog): Element => {
            const linkElement = document.createElement("a");
            linkElement.href = "#";
            linkElement.onclick = () => {
                openCharacterModal(c.character_id);
                return false;
            }
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
        };

        const pushLogs = (...cs: ChatLog[]) => {
            let showFrame = document.getElementById("chat-show")

            if (showFrame !== undefined && showFrame !== null) {
                for (const c of cs) {
                    showFrame.appendChild(getChatElement(c))
                }

                showFrame.scrollTop = showFrame.scrollHeight
            }
        };

        const createChatSocket = (token: string) =>
            new Socket(socketUrl(), {
                params: {token: token},
                logger: (kind, msg, data) => {
                    console.log(`${kind}: ${msg}`, data)
                }
            });

        const configureSocketChannel = (skt: Socket) => {
            console.log("Connecting... ");
            skt.connect();

            const channel = skt.channel(`chats:${id}`);

            channel.on("new_chat_log", res => {
                console.log("pushing single chat", res)
                pushLogs(res)
            });

            channel.join()
                .receive("ok", ({chats}) => {
                    console.log("Pushing chats")
                    pushLogs(...chats)
                })
                .receive("error",
                        reason => console.error("Error while joining the chat!", reason));

            setChatChannel(channel);
        }

        getUserToken()
            .then(tk => {
                if (!checkResponse(tk)) {
                    console.error("Failed to retrieve the chat user token.", tk);
                    history.push("/chats");
                    return;
                }

                console.log("chat token", tk);

                socket.current = createChatSocket((tk as CodeResponse).code);
                configureSocketChannel(socket.current);
            })

        getRoom(id)
            .then(r => {
                if (checkResponse(r)) {
                    setRoom(r as ChatRoom)
                }
            });

    }, [id])

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