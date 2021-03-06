import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.friendStatus == 0) {
            axios
                .post(`/send-friend-request/${this.props.match.params.id}`)
                .then(resp => {
                    this.props.setFriendshipStatus(resp.data.status);
                });
        } else if (this.props.friendStatus == 1) {
            if (this.props.match.params.id == this.props.senderId) {
                axios
                    .post(
                        `/accept-friend-request/${this.props.match.params.id}`
                    )
                    .then(resp => {
                        this.props.setFriendshipStatus(resp.data.status);
                    });
            } else {
                axios
                    .post(
                        `/cancel-friend-request/${this.props.match.params.id}`
                    )
                    .then(resp => {
                        this.props.setFriendshipStatus(resp.data.status);
                    });
            }
        } else if (this.props.friendStatus == 2) {
            axios.post(`/unfriend/${this.props.match.params.id}`).then(resp => {
                this.props.setFriendshipStatus(resp.data.status);
            });
        } else if (this.props.friendStatus == 5) {
            axios
                .post(`/send-friend-request/${this.props.match.params.id}`)
                .then(resp => {
                    this.props.setFriendshipStatus(resp.data.status);
                });
        }
    }

    renderButton() {
        let text;
        if (this.props.friendStatus == 1) {
            text = "Pending Request";
            if (this.props.match.params.id == this.props.senderId) {
                text = "Accept Friend Request";
            } else {
                text = "Cancel Friend Request";
            }
        } else if (this.props.friendStatus == 2) {
            text = "Unfriend";
        } else {
            text = "Send Friend Request";
        }
        return (
            <button className="dynamicButton" onClick={this.handleSubmit}>
                {text}
            </button>
        );
    }

    render() {
        return this.renderButton();
    }
}
