import "phoenix_html"
import React from "react";
import ReactDOM from "react-dom";
import Menu from "../ts/menu";

const _css = require("../css/app.css")

const index_page = document.getElementById("index-page")

ReactDOM.render(<div>StoCazzo</div>, index_page)

const menu_top = document.getElementById("menu-top")

ReactDOM.render(<Menu />, menu_top)
