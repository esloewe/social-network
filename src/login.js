import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("click");
        axios.post("/login", this.state).then(resp => {
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
            <form>
                <h2>Log in</h2>
                {this.state.error}
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
                <Link to="/">Click here to register!</Link>
            </form>
        );
    }
}
