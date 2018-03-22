import axios from "./axios";

export function recievedFriendsandPendingFriends() {
    return axios.get("/friends-and-pending-friends").then(resp => {
        return {
            type: "RECIEVED_FRIENDS_AND_PENDING_LIST",
            pendingAndFriendsList: resp.data.results
        };
    });
}

export function makeFriend(id) {
    return axios.post(`/accept-friend-request/` + id).then(() => {
        return {
            type: "PENDING_FRIENDS_LIST",
            id
        };
    });
}

export function endFriendship(id) {
    return axios.post(`/unfriend/` + id).then(() => {
        return {
            type: "FRIENDS_LIST",
            id
        };
    });
}
