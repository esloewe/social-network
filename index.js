const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const compression = require("compression");
const bcrypt = require("bcryptjs");
const csrf = require("csurf");
const { hashPassword, checkPassword } = require("./hashPass");
const { getUser } = require("./database");

app.use(express.static("./public"));

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

////////////welcome////////////

app.post("/welcome", (req, res) => {
    console.log("inside welcome post", req.body);
    if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
    ) {
        console.log("error");
        res.sendFile(__dirname + "/index.html");
    } else {
        let hashPass = hashPassword(req.body.password);
        hashPass.then(hashPass => {
            return getUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashPass
            ).then(results => {
                console.log("results", results);
            });
        });
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
