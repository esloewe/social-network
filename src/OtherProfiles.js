import React from "react";
import axios from "./axios";
import FriendButton from "./FriendButton";

export default class OtherProfiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            profilePic: "",
            bio: ""
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id);

        axios.get(`/get-user/${this.props.match.params.id}`).then(resp => {
            console.log("true stuff", resp.data.sameProfile == true);

            console.log("other profile respt ", resp);
            if (resp.data.sameProfile == true) {
                return this.props.history.push("/");
            } else {
                this.setState({
                    id: resp.data.id,
                    firstname: resp.data.firstname,
                    lastname: resp.data.lastname,
                    email: resp.data.email,
                    profilePic: resp.data.profilePic,
                    bio: resp.data.bio,
                    senderId: resp.data.senderId,
                    friendStatus: resp.data.friendStatus
                });
            }
        });
    }

    render() {
        return (
            <div className="othersProfilePage">
                <div>
                    <h2>
                        {this.state.firstname} {this.state.lastname}
                    </h2>

                    <p>{this.state.bio} </p>
                    <img id="imageInOtherProfile" src={this.state.profilePic} />
                </div>
                <FriendButton
                    friendStatus={this.state.friendStatus}
                    senderId={this.state.senderId}
                />
            </div>
        );
    }
}
