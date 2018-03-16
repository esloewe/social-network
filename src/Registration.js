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
            <div className="containerRegister">
                <form>
                    <h2 id="registerTitle"> Register </h2>
                    {this.state.error}
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

                    <Link to="/login">Click here to Log in!</Link>
                </form>
            </div>
        );
    }
}
