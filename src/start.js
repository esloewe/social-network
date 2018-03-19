import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
