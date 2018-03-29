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
    uploadProfilePic,
    updateBio,
    getOtherUserData,
    getFriendshipStatus,
    sendFriendRequest,
    updateFriendRequest,
    friendReqsAndFriendsList,
    jobs,
    getUserByIdChat
} = require("./database");
const config = require("./config");
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
//socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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
const cookieSessionMiddleware = cookieSession({
    secret: process.env.SECRET || require("./secrets.json").secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

                res.json({
                    success: true
                });
            });
        });
    }
});

app.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        loginUser(req.body.email).then(hash => {
            if (hash) {
                checkPassword(req.body.password, hash).then(doesMatch => {
                    if (doesMatch) {
                        getUserData(req.body.email).then(
                            dataFromGetUserData => {
                                req.session.user = {
                                    firstname: dataFromGetUserData.firstname,
                                    lastname: dataFromGetUserData.lastname,
                                    email: dataFromGetUserData.email,
                                    id: dataFromGetUserData.id,
                                    image: dataFromGetUserData.file,
                                    bio: dataFromGetUserData.bio
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
    if (req.file) {
        uploadProfilePic(req.file.filename, req.session.user.id).then(() => {
            res.json({
                profilePic: config.s3Url + req.file.filename
            });
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post("/bio", (req, res) => {
    if (req.body.bio) {
        updateBio(req.body.bio, req.session.user.id).then(results => {
            results.bio = req.session.bio;

            res.json({
                bio: req.body.bio
            });
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post("/send-friend-request/:id", (req, res) => {
    let status = 1;

    sendFriendRequest(req.session.user.id, req.params.id, status).then(() => {
        res.json({
            status
        });
    });
});

app.post("/accept-friend-request/:id", (req, res) => {
    let status = 2;

    updateFriendRequest(req.session.user.id, req.params.id, status).then(
        results => {
            res.json({
                status,
                senderId: results.sender_id,
                recipientId: results.recipient_id
            });
        }
    );
});

app.post("/unfriend/:id", (req, res) => {
    let status = 4;

    updateFriendRequest(req.session.user.id, req.params.id, status).then(
        results => {
            res.json({
                status,
                senderId: results.sender_id,
                recipientId: results.recipient_id
            });
        }
    );
});

app.post("/cancel-friend-request/:id", (req, res) => {
    let status = 5;

    updateFriendRequest(req.session.user.id, req.params.id, status).then(
        results => {
            res.json({
                status,
                senderId: results.sender_id,
                recipientId: results.recipient_id
            });
        }
    );
});

// ------------------------------------------------------------------------------- gets

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
        results.profile_pic =
            results.profile_pic && config.s3Url + results.profile_pic;

        res.json({
            firstname: results.first_name,
            lastname: results.last_name,
            email: results.email,
            profilePic: results.profile_pic,
            bio: results.bio
        });
    });
});

app.get("/get-user/:id", (req, res) => {
    const id = req.params.id;

    if (req.session.user.id == req.params.id) {
        res.json({ sameProfile: true });
    } else {
        Promise.all([
            getOtherUserData(id),
            getFriendshipStatus(id, req.session.user.id)
        ]).then(results => {
            if (results[0].profile_pic) {
                results[0].profile_pic = config.s3Url + results[0].profile_pic;
            }

            res.json({
                firstname: results[0].first_name,
                lastname: results[0].last_name,
                email: results[0].email,
                profilePic: results[0].profile_pic,
                bio: results[0].bio,
                senderId: results[1] && results[1].senderId,
                recipientId: results[1] && results[1].recipientId,
                friendStatus: results[1] && results[1].status,
                sameProfile: false
            });
        });
    }
});

app.get("/friends-and-pending-friends", (req, res) => {
    friendReqsAndFriendsList(req.session.user.id).then(results => {
        results.forEach(function(result) {
            if (result.profile_pic != null) {
                result.profile_pic = config.s3Url + result.profile_pic;
            }
        });

        res.json({
            results
        });
    });
});
app.get("/jobs.json", (req, res) => {
    jobs().then(results => {
        console.log("jobs results ", results);
        res.json({
            results
        });
    });
});
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

//CHAT ----------------------------------------------------------------------------------//

let onlineUsers = [];
let chatMessages = [];

io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    //onlineUsers
    //connected
    if (!socket.request.session || !socket.request.session.user) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.user.id;
    onlineUsers.push({
        userId,
        socketId: socket.id
    });

    const alreadyInList =
        onlineUsers.filter(function(user) {
            return user.userId == userId;
        }).length > 1;

    if (!alreadyInList) {
        getUserByIdChat([userId]).then(user => {
            user.forEach(function(user) {
                if (user.profile_pic != null) {
                    user.profile_pic = config.s3Url + user.profile_pic;
                } else if (user.profile_pic == null) {
                    user.profile_pic = "/media/SVG/defaultimg.svg";
                }
            });
            socket.broadcast.emit("userJoined", user.pop());
        });
    }

    getUserByIdChat(onlineUsers.map(user => user.userId)).then(users => {
        users.forEach(function(users) {
            if (users.profile_pic != null) {
                users.profile_pic = config.s3Url + users.profile_pic;
            } else if (users.profile_pic == null) {
                users.profile_pic = "/media/SVG/defaultimg.svg";
            }
        });

        socket.emit("onlineUsers", users);
    });

    //disconnected

    socket.on("disconnect", function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);

        onlineUsers = onlineUsers.filter(user => {
            return user.socketId != socket.id;
        });

        const stillInList = onlineUsers.filter(user => {
            return user.userId == userId;
        }).length;

        if (!stillInList) {
            io.sockets.emit("userLeft", userId);
        }
    });
    //chat messaging

    socket.emit("chatMessages", chatMessages);

    socket.on("chatMessage", function(msg) {
        chatMessages.push(msg);
        if (chatMessages.length > 10) {
            chatMessages.shift();
        }

        io.sockets.emit("newChatMessage", msg);
    });
});
