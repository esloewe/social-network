import React from "react";
import axios from "./axios";

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
        this.setState({ showTextarea: !this.state.showTextarea })
    }


    saveBio(e) {
        e.preventDefault();
        axios.post("/bio", { bio: this.bio }).then(resp => {
            this.props.setBio(resp.data.bio );
        });
    }

    handleChange(e) {
        this.bio = e.target.value
    }

    render(props) {
        return (
            <div>
                <h2>
                    {this.props.firstname} {this.props.lastname}
                </h2>
                <div className="imageInProfile">
                    <img src= {this.props.profilePic}/>
                </div>
                <a href="" onClick={this.toggleTextarea}>
                    About me:
                </a>

                {this.state.showTextarea && (
                    <div>
                        <textarea
                            onChange={this.handleChange}
                            rows="4"
                            cols="50"
                            placeholder="share your bio with us here!"
                            value={this.bio}
                        />
                        <button onClick={this.saveBio}>update</button>
                    </div>

                )}
                {!this.state.showTextarea &&  <p>  {this.props.bio}</p> }
            </div>
        )
    }
}
