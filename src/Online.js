import React from "react";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor() {
        super();

        this.renderOnlineUsers = this.renderOnlineUsers.bind(this);
    }

    renderOnlineUsers() {
        if (!this.props.onlineUsers) {
            return null;
        }

        return this.props.onlineUsers.map(user => {
            console.log("some online user", user);
            return (
                <div key={user.id}>
                    <p>
                        {user.first_name} {user.last_name}
                    </p>

                    <img id="imageInOnline" src={user.profile_pic} />
                </div>
            );
        });
    }

    render() {
        return <div className="onlineUsers">{this.renderOnlineUsers()} </div>;
    }
}

function mapStateToProps(state) {
    return {
        onlineUsers: state.users
    };
}

export default connect(mapStateToProps)(Online);
