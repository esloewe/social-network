import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./Logo";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <Logo />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
