import React from "react";

export default function reducer(state = {}, action) {
    if (action.type == "RECIEVED_FRIENDS_AND_PENDING_LIST") {
        state = Object.assign({}, state, {
            pendingAndFriendsList: action.pendingAndFriendsList
        });
    }

    if (action.type == "PENDING_FRIENDS_LIST") {
        return {
            ...state,
            pendingAndFriendsList: state.pendingAndFriendsList.map(function(
                user
            ) {
                if (user.id == action.id) {
                    return {
                        ...user,
                        status: 2 // to status i want to change it to ..
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "FRIENDS_LIST") {
        return {
            ...state,
            pendingAndFriendsList: state.pendingAndFriendsList.map(function(
                user
            ) {
                if (user.id == action.id) {
                    return {
                        ...user,
                        status: 4
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "ONLINE_USERS") {
        return {
            ...state,
            users: action.users
        };
    }

    if (action.type == "USER_JOINED") {
        return {
            ...state,
            users: [...state.users, action.user]
        };
    }

    if (action.type == "USER_LEFT") {
        const newUsers = state.users.filter(user => user.id != action.userId);

        return {
            ...state,
            users: newUsers
        };
    }

    if (action.type == "CHAT_MESSAGES") {
        console.log("action in chat messages", action);
        return {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type == "NEW_CHAT_MESSAGE") {
        console.log("one message", action.msg);
        return {
            ...state,
            chatMessages: [...state.chatMessages, action.msg]
        };
    }

    return state;
}
