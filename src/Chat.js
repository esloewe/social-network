import React from "react";
import { connect } from "react-redux";
import { chatMessages } from "./actions";
import { emitChatMessage } from "./socket";

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.renderSingleMessage = this.renderSingleMessage.bind(this);
        this.showingChat = this.showingChat.bind(this);
    }

    renderSingleMessage(e) {
        if (e.keyCode == 13) {
            console.log("new message", e.target.value);
            emitChatMessage(e.target.value);
            e.target.value = "";
        }
    }

    showingChat() {
        if (!this.props.chatMessages) {
            return null;
        }

        return this.props.chatMessages.map(message => {
            console.log("messageeeeeeeee", message);
            return (
                <div>
                    <p>{message}</p>
                    <br />
                </div>
            );
        });
    }

    render() {
        if (!this.props) {
            return null;
        }

        console.log("this pros in render", this.props);
        return (
            <div className="containerInChat">
                <h2 id="titleInChat">Chat with the Community</h2>
                <div className="chat">{this.showingChat()}</div>
                <div>
                    <textarea
                        onKeyDown={e => this.renderSingleMessage(e)}
                        rows="10"
                        cols="150"
                        placeholder="share your message here"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("in map state to props", state);
    return {
        chatMessages: state.chatMessages
    };
}

export default connect(mapStateToProps)(Chat);
