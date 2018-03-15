import React from "react";
import axios from "./axios";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import ProfilePicUpload from "./ProfilePicUpload";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            profilePic: "./profilePic.png",
            showUploader: false
        };

        this.toggleUploader = this.toggleUploader.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setNewImage = this.setNewImage.bind(this);
    }

    componentDidMount() {
        console.log("looking at comp did mout");
        axios.get("/user").then(resp => {
            console.log("resp", resp);
            this.setState({
                firstname: resp.data.firstname,
                lastname: resp.data.lastname,
                email: resp.data.email,
                profilePic: resp.data.profilePic
            });
        });
    }

    toggleUploader() {
        console.log("this state toogle uploader", this);
        this.setState({ showUploader: !this.state.showUploader });
    }

    handleSubmit(e) {
        console.log("click");
        e.preventDefault();
    }

    setNewImage(profilePic) {
        console.log("running set new image");
        this.setState({ profilePic });
    }

    render() {
        return (
            <div>
                <Logo />
                <div id="profilePic">
                    <img
                        onClick={this.toggleUploader}
                        src={this.state.profilePic}
                        alt=""
                    />
                </div>
                {this.state.showUploader && (
                    <ProfilePicUpload
                        setNewImage={this.setNewImage}
                        handleSubmit={this.handleSubmit}
                    />
                )}
            </div>
        );
    }
}
