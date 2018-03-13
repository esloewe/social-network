import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("click");
        axios.post("/welcome", this.state).then(resp => {
            this.setState({ newUser: resp.data });
        });
        console.log("statelog ", this.state);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form>
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
                    type="text"
                    placeholder="Password"
                />
                <button onClick={this.handleSubmit}> Submit </button>
            </form>
        );
    }
}
