import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super()
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""

        }
    }
    //make constructor here and pass in firstname = "" etc...


    handleSubmit(e) {
        e.preventDefault();
        // console.log("click");
        // axios.post goes here
        axios.post("/welcome", this.state);

        //after finish with constructor and handlechange thne i can work on this function which
        //will give me back the whole input the user gave by console logging this.state here.
        //if that works then i can make the axios.post then go to server and make an app.post route to /welcome.
        //console.log req.body and it should show me the input from user.
        //if all works on server then hash pass and send dat ato db.
    }
    handleChange() {
        //setstate see mats code
        console.log(this.state);
        ;
        // axios.post
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
                <input onChange={this.handleChange} name="lastname" type="text" placeholder="Last Name" />
                <input onChange={this.handleChange} name="email" type="text" placeholder="Email" />
                <input onChange={this.handleChange} name="password" type="text" placeholder="Password" />
                <button onClick={this.handleSubmit}> Submit </button>
            </form>
        );
    }
}

//
