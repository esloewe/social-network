import React from "react";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    handleSubmit(e) {
        console.log("clickcc");
        e.preventDefault();

        axios.post("/friend-request");
    }

    renderButton() {
        let text;
        if (this.props.friendStatus == 1) {
            text = "Pending Request";
        } else if (this.props.friendStatus == 2) {
            text = "Friends";
        } else if (this.props.friendStatus == 3) {
            text = "Friendship not accepted";
        } else if (this.props.friendStatus == 4) {
            text = "Unfriend";
        } else if (this.props.friendStatus == 5) {
            text = "Cancel friend request";
        } else if (this.props.friendStatus == 0) {
            text = "Send Friend Request";
        }
        return (
            <button className="dynamicButton" onClick={this.handleSubmit}>
                {text}
            </button>
        );
    }

    render() {
        console.log("rendering friend button", this.props);
        return this.renderButton();
    }
}
