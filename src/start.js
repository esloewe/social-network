import React from "react";
import ReactDOM from "react-dom";
import logo from "./logo";
import Welcome from "./Welcome";

ReactDOM.render(<Welcome />, document.querySelector("main"));

function HelloWorld() {
    return <div>Hello, World!</div>;
}

// entry point for react application
