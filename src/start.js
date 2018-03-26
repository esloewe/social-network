import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";
//redux
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
// socket.io
import * as io from "socket.io-client";
import initSocket from "./socket";
initSocket();

// ---------------------------------------//

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));

// ---------------------------------------//
export { store };
