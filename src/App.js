import React from "react";
import axios from "./axios";
import Logo from "./Logo";
import { Link, BrowserRouter, Route } from "react-router-dom";
import ProfilePicUpload from "./ProfilePicUpload";
import Profile from "./Profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            profilePic: "profilePic.png",
            bio: "",
            showUploader: false
        };

        this.toggleUploader = this.toggleUploader.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setNewImage = this.setNewImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(resp => {
            console.log("resp", resp);
            this.setState({
                firstname: resp.data.firstname,
                lastname: resp.data.lastname,
                email: resp.data.email,
                profilePic: resp.data.profilePic || this.state.profilePic,
                bio: resp.data.bio
            });
        });
    }

    toggleUploader() {
        this.setState({ showUploader: !this.state.showUploader });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    setNewImage(profilePic) {
        this.setState({ profilePic });
    }

    setBio(bio) {
        this.setState({ bio: bio });
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

                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    email={this.state.email}
                                    profilePic={this.state.profilePic}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}