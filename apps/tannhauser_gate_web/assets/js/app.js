import "phoenix_html"
import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "../ts/app-container";

const _css = require("../css/app.css")

const index_page = document.getElementById("index-page")

ReactDOM.render(<AppContainer />, index_page)
