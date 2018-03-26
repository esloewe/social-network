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
        console.log("inside reducers ONLINE_USERS", action.users);
        return {
            ...state,
            users: action.users
        };
    }

    if (action.type == "USER_JOINED") {
        console.log("inside reducers USER_JOINED", state.users);
        return {
            ...state,
            users: [...state.users, action.user]
        };
    }

    if (action.type == "USER_LEFT") {
        console.log("inside reducers USER_LEFT", state.users);
        const newUsers = state.users.filter(user => user.id != action.userId);
        console.log("new userrss", newUsers);
        return {
            ...state,
            users: newUsers
        };
    }

    return state;
}
