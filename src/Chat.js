import React from "react";
import { connect } from "react-redux";
import { chatMessages } from "./actions";
import { emitChatMessage } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.renderSingleMessage = this.renderSingleMessage.bind(this);
        this.showingChat = this.showingChat.bind(this);
    }

    renderSingleMessage(e) {
        if (e.keyCode == 13) {
            console.log("about to emit chat message", this.props);
            emitChatMessage({
                firstname: this.props.firstname,
                lastname: this.props.lastname,
                image: this.props.profilePic,
                message: e.target.value,
                createdAt: Date()
            });
            e.target.value = "";
        }
    }

    componentDidUpdate() {
        const messageScroll = this.messageScroll;
        console.log(messageScroll);
        if (messageScroll) {
            messageScroll.scrollTop =
                messageScroll.scrollHeight - messageScroll.clientHeight;
        }
    }

    showingChat() {
        if (!this.props.chatMessages) {
            return null;
        }

        return this.props.chatMessages.map((messageInfo, i) => {
            const classes = {
                arrow: true,
                bottom: true,
                right: true
            };
            return (
                <div key={i} className="messageInChat">
                    <div className={classes} />
                    <p id="msgTextInChat">{messageInfo.message}</p>
                    <div className="containerChatInfo">
                        <img src={messageInfo.image} />
                        <p id="nameInChat">
                            {messageInfo.firstname} {messageInfo.lastname}
                        </p>
                        <p id="timeInChat">{messageInfo.createdAt}</p>
                    </div>

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
                <div
                    className="chat"
                    ref={messageScroll => (this.messageScroll = messageScroll)}
                >
                    {this.showingChat()}
                </div>
                <div>
                    <textarea
                        onKeyDown={e => this.renderSingleMessage(e)}
                        rows="5"
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

// {dateFormat(new Date(), "pretty-a")}
