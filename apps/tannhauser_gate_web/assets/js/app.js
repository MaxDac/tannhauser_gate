import "phoenix_html"
import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "../ts/app-container";
import * as serviceWorker from '../ts/serviceWorker';

const _css = require("../css/app.css")

// PWA service worker
// navigator.serviceWorker.register('/js/service-worker.js')

const index_page = document.getElementById("index-page")

ReactDOM.render(<AppContainer />, index_page)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
