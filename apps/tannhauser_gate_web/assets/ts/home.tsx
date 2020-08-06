import React from "react";
import "../css/main-app.css";
import {getUserToken} from "./helpers";

export default function Home() {
    return (
        <div className="app-container">
            Bienvenue dans le app. Token: {getUserToken()}
        </div>
    )
}
