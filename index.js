const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const compression = require("compression");
const csrf = require("csurf");
const { hashPassword, checkPassword } = require("./hashPass");
const {
    insertNewUser,
    loginUser,
    getUserData,
    uploadProfilePic
} = require("./database");
const config = require("./config");
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");

// middleware

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("./public"));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cookieSession({
        secret: process.env.SECRET || require("./secrets.json").secret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csrf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

//posts
app.post("/welcome", (req, res) => {
    if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            success: false,
            error: "Something went wrong. Please try again!"
        });
    } else {
        let hashPass = hashPassword(req.body.password);
        hashPass.then(hashPass => {
            insertNewUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashPass
            ).then(id => {
                req.session.user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    id
                };
                console.log("after req session", req.session.user);

                res.json({
                    success: true
                });
            });
        });
    }
});

app.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        console.log("about to run login user", req.body.email);
        loginUser(req.body.email).then(hash => {
            if (hash) {
                console.log("about to run check pass", hash);
                checkPassword(req.body.password, hash).then(doesMatch => {
                    if (doesMatch) {
                        getUserData(req.body.email).then(
                            dataFromGetUserData => {
                                req.session.user = {
                                    firstname: dataFromGetUserData.firstname,
                                    lastname: dataFromGetUserData.lastname,
                                    email: dataFromGetUserData.email,
                                    id: dataFromGetUserData.id,
                                    image: dataFromGetUserData.file
                                };
                                res.json({
                                    success: true
                                });
                            }
                        );
                    }
                });
            } else {
                res.json({
                    success: false,
                    error: "Something went wrong. Please try again!"
                });
            }
        });
    } else if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            error: "Something went wrong. Please try again!"
        });
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("inside post upload");

    if (req.file) {
        uploadProfilePic(req.file.filename, req.session.user.id).then(
            results => {
                res.json({
                    profilePic: config.s3Url + req.file.filename
                });
            }
        );
    } else {
        res.json({
            success: false
        });
    }
});

// gets

app.get("/welcome", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/", (req, res) => {
    if (!req.session.user) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/user", (req, res) => {
    getUserData(req.session.user.email).then(results => {
        console.log("looking at the session", req.session.user);
        console.log("user stifff with img ", results);
        results.profile_pic = config.s3Url + results.profile_pic;

        res.json({
            firstname: results.first_name,
            lastname: results.last_name,
            email: results.email,
            profilePic: results.profile_pic
        });
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
