import React from "react";
import { connect } from "react-redux";
import {
    recievedFriendsandPendingFriends,
    makeFriend,
    endFriendship
} from "./actions";

class Friends extends React.Component {
    constructor() {
        super();

        this.renderFriends = this.renderFriends.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(recievedFriendsandPendingFriends());
    }

    renderFriends() {
        if (!this.props.friends) {
            return <div>loading...</div>;
        }
        return this.props.friends.map(friend => {
            let image = friend.profile_pic;
            if (!image) {
                image = "/media/SVG/defaultimg.svg";
            }
            return (
                <div key={friend.id}>
                    <img src={image} />
                    {friend.first_name}, {friend.last_name}
                    <button
                        onClick={() =>
                            this.props.dispatch(endFriendship(friend.id))
                        }
                    >
                        Unfriend
                    </button>
                </div>
            );
        });
    }

    renderPendingFriends() {
        if (!this.props.pendingFriends) {
            return <div>loading...</div>;
        }
        return this.props.pendingFriends.map(friend => {
            let image = friend.profile_pic;
            if (!image) {
                image = "/media/SVG/defaultimg.svg";
            }
            return (
                <div key={friend.id}>
                    <img src={image} />
                    {friend.first_name}, {friend.last_name}
                    <button
                        onClick={() =>
                            this.props.dispatch(makeFriend(friend.id))
                        }
                    >
                        Accept Friend Request
                    </button>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Pending Friend Request</h3>
                    <div className="friendsList">
                        {this.renderPendingFriends()}
                    </div>
                </div>
                <div>
                    <h3>Your friends</h3>
                    <div className="friendsList">{this.renderFriends()}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friends:
            state.pendingAndFriendsList &&
            state.pendingAndFriendsList.filter(friend => {
                return friend.status == 2;
            }),

        pendingFriends:
            state.pendingAndFriendsList &&
            state.pendingAndFriendsList.filter(friend => {
                return friend.status == 1;
            })
    };
}

export default connect(mapStateToProps)(Friends);
