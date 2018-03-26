import * as io from "socket.io-client";
import { store } from "./start";
import { onlineUsers, userJoined, userLeft } from "./actions";

export default function initSocket() {
    const socket = io.connect();

    socket.on("onlineUsers", users => {
        console.log("running socketevent online users", users);
        store.dispatch(onlineUsers(users));
    });

    socket.on("userJoined", user => {
        store.dispatch(userJoined(user));
    });

    socket.on("userLeft", userId => {
        console.log("dispaching user left", userId);
        store.dispatch(userLeft(userId));
    });
}
