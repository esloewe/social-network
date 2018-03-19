import React from "react";
import axios from "./axios";

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
            console.log("resp", resp);

            this.setState({
                id: resp.data.id,
                firstname: resp.data.firstname,
                lastname: resp.data.lastname,
                email: resp.data.email,
                profilePic: resp.data.profilePic,
                bio: resp.data.bio
            });
        });
    }

    render() {
        return (
            <div className="othersProfilePage">
                <div>
                    <h2>
                        {this.state.firstname} {this.state.lastname}{" "}
                    </h2>

                    <p>{this.state.bio} </p>
                    <img id="imageInOtherProfile" src={this.state.profilePic} />
                </div>
            </div>
        );
    }
}
