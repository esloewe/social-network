import * as io from "socket.io-client";
import { store } from "./start";
import {
    onlineUsers,
    userJoined,
    userLeft,
    chatMessages,
    newChatMessage
} from "./actions";
let socket;
export default function initSocket() {
    socket = io.connect();

    socket.on("onlineUsers", users => {
        store.dispatch(onlineUsers(users));
    });

    socket.on("userJoined", user => {
        store.dispatch(userJoined(user));
    });

    socket.on("userLeft", userId => {
        store.dispatch(userLeft(userId));
    });

    socket.on("chatMessages", messages => {
        store.dispatch(chatMessages(messages));
    });

    socket.on("newChatMessage", messages => {
        store.dispatch(newChatMessage(messages));
    });
}

export function emitChatMessage(message) {
    socket.emit("chatMessage", message);
}
