import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextarea: false
        };

        this.toggleTextarea = this.toggleTextarea.bind(this);
        this.saveBio = this.saveBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleTextarea(e) {
        e.preventDefault();
        this.setState({ showTextarea: !this.state.showTextarea });
    }

    saveBio() {
        axios.post("/bio", { bio: this.bio }).then(resp => {
            this.props.setBio(resp.data.bio);
        });
    }

    handleChange(e) {
        this.bio = e.target.value;
    }

    render(props) {
        return (
            <div className="profilePage">
                <div className="sideNav">
                    <Link id="linksSideNav" to="/">
                        My Profile
                    </Link>
                    <Link id="linksSideNav" to="/friends">
                        Friends
                    </Link>
                    <Link id="linksSideNav" to="/online">
                        Online Friends
                    </Link>
                    <Link id="linksSideNav" to="/jobs">
                        Job Board
                    </Link>
                    <a id="linksSideNav" href="/logout">
                        Log out
                    </a>
                </div>
                <div className="imageInProfile">
                    <img src={this.props.profilePic} />
                </div>
                <div>
                    <h2 id="titleInProfile">
                        {this.props.firstname} {this.props.lastname}
                    </h2>

                    <a id="aboutMeClick" href="" onClick={this.toggleTextarea}>
                        About me:
                    </a>

                    {this.state.showTextarea && (
                        <div id="textareaArea">
                            <textarea
                                onChange={this.handleChange}
                                rows="10"
                                cols="50"
                                placeholder="share your bio with us here!"
                                value={this.bio}
                            />
                            <button id="buttonProfile" onClick={this.saveBio}>
                                update
                            </button>
                        </div>
                    )}
                    {!this.state.showTextarea && (
                        <p id="bioInProfile"> {this.props.bio}</p>
                    )}
                </div>
            </div>
        );
    }
}
