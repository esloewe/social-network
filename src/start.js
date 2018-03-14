import React from "react";
import ReactDOM from "react-dom";
import Logo from "./Logo";
import Welcome from "./Welcome";

let elem;

if (location.pathname === "/") {
    elem = <Logo />;
} else if (location.pathname === "/welcome") {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
