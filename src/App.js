import React from "react";
import axios from "./axios";
import Logo from "./Logo";
import { Link, BrowserRouter, Route } from "react-router-dom";
import ProfilePicUpload from "./ProfilePicUpload";
import Profile from "./Profile";
import OtherProfiles from "./OtherProfiles";
import JobBoard from "./JobBoard";
import Friends from "./Friends";
import Online from "./Online";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            profilePic: "/media/SVG/defaultimg.svg",
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
        this.setState({ bio });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div id="profilePic">
                        <Link to="/">
                            <img
                                className="logoSmallheader"
                                src="/media/SVG/logo-black.svg"
                            />
                        </Link>

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
                        <Route path="/user/:id" component={OtherProfiles} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/jobs" component={JobBoard} />
                        <Route path="/online" component={Online} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
