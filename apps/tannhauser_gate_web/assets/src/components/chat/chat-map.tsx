import React, {CSSProperties, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useHistory} from "react-router";
import {checkResponse, ErrorResponse} from "../../services/error-response";
import ChatRoom from "../../dtos/chats/chat-room";
import "./chat.css";
import {getRooms} from "../../services/chat-services";
import {isLoginExpired} from "../../services/authentication-services";

export default function ChatMap() {
    const [rooms, setRooms] = useState<ChatRoom[]>([])
    const [selectedRoom, setSelectedRoom] = useState("")

    const history = useHistory()

    useEffect(() => {
        getRooms()
            .then(rooms => {
                console.log("rooms", rooms)
                if (checkResponse(rooms)) {
                    setRooms(rooms as ChatRoom[]);
                }
                else {
                    if (isLoginExpired(rooms as ErrorResponse)) {
                        history.push("/login/unauthorized");
                    }
                }
            })
    }, [history])

    const indicators = () => {
        const rows = []

        for (const room of rooms) {
            const [x, y] =
                room.coords
                    .split(",")
                    .map(x => parseInt(x))

            const rowPositionStyle: CSSProperties = {
                "position": "absolute",
                "top": `${y - 15}px`,
                "left": `${x - 15}px`,
                "width": "30px",
                "height": "30px"
            }

            rows.push(
                <img src="images/map-dot-blurred.png"
                     key={`${room.id}`}
                     className="background-map-dot"
                     style={rowPositionStyle}
                     alt={`map-under-${room.id}`} />
            )

            rows.push(
                <img src="images/map-dot.png"
                     key={`${room.id}hover`}
                     className="selected-map-dot"
                     onMouseOver={() => setSelectedRoom(room.name)}
                     onMouseOut={() => setSelectedRoom("")}
                     onClick={() => history.push(`/chat/${room.id}`)}
                     style={rowPositionStyle}
                     alt={`map-selector-${room.id}`} />
            )
        }

        return rows
    }

    return (
        <div>
            <h3>
                Map {selectedRoom}
            </h3>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div>
                            {indicators()}
                            <img src="/images/map.jpg" alt="map" className="map-image" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
