const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const compression = require("compression");
const bcrypt = require("bcryptjs");
const csrf = require("csurf");
const { hashPassword, checkPassword } = require("./hashPass");

app.use(express.static("./public"));

app.use(compression());

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

// app.get('/welcome', (req,res) => {
//     getUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password_hash).then( results => {
//
//         res.json({
//             test: "test"
//         });
//
//     })
//     console.log("inside welcome get" results);
//

// })

app.listen(8080, function() {
    console.log("I'm listening.");
});
