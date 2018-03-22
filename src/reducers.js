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

    return state;
}
