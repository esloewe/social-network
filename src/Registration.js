import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/welcome", this.state).then(resp => {
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                location.replace("/");
            }
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <span id="introPlattform">
                    <h2 className="introPlattform">
                        Meet and join a community of like-minded people. Find
                        yoga and wellness jobs worldwide. Travel, explore and
                        give back.
                    </h2>
                </span>
                <div className="containerRegister">
                    <form>
                        <h2 id="registerTitle"> Register </h2>
                        <p className="error">{this.state.error}</p>
                        <input
                            onChange={this.handleChange}
                            name="firstname"
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            onChange={this.handleChange}
                            name="lastname"
                            type="text"
                            placeholder="Last Name"
                        />
                        <input
                            onChange={this.handleChange}
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <button onClick={this.handleSubmit}> Submit </button>
                        <div id="or">or</div>
                        <div id="a">
                            <Link to="/login">Click here to Log in!</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
