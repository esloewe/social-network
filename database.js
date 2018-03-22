const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.insertNewUser = function(first_name, last_name, email, password_hash) {
    return db
        .query(
            `INSERT INTO users_data (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [first_name, last_name, email, password_hash]
        )
        .then(results => {
            return results.rows[0].id;
        })
        .catch(error => {
            console.log(error);
        });
};

exports.loginUser = function(email) {
    return db
        .query(
            `SELECT password_hash
                FROM users_data
                WHERE email = $1`,
            [email]
        )
        .then(results => {
            return results.rows[0].password_hash;
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getUserData = function(email) {
    return db
        .query(
            `SELECT first_name, last_name, email, id, profile_pic, bio
            FROM users_data
            WHERE email = $1`,
            [email]
        )
        .then(results => {
            return results.rows[0];
        })
        .catch(error => {
            console.log(error);
        });
};

exports.uploadProfilePic = function(profile_pic, id) {
    return db
        .query(
            `UPDATE users_data
            SET profile_pic = $1
            WHERE id = $2`,
            [profile_pic, id]
        )
        .then(results => {
            return results.rows[0];
        })
        .catch(error => {
            console.log(error);
        });
};

exports.updateBio = function(bio, id) {
    return db.query(
        `UPDATE users_data
        SET bio = $1
        WHERE id = $2`,
        [bio, id]
    );
};

exports.getOtherUserData = function(id) {
    return db
        .query(
            `SELECT *
            FROM users_data
            WHERE id = $1`,
            [id]
        )
        .then(results => {
            console.log("result for get other user data", results.rows);
            return results.rows[0];
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getFriendshipStatus = function(recipient_id, sender_id) {
    return db
        .query(
            `SELECT * FROM friendships
            WHERE (recipient_id = $1 OR sender_id = $1)
            AND (recipient_id = $2 OR sender_id = $2)
            AND (status = 1 OR status = 2)`,
            [recipient_id, sender_id]
        )
        .then(results => {
            let status;
            console.log("result rows friendshipss ", results.rows[0]);
            if (!results.rows[0]) {
                status = 0;
            } else {
                status = results.rows[0].status;
            }
            console.log("statussss set  ", status);
            return {
                status,
                senderId:
                    (results.rows[0] && results.rows[0].sender_id) || null,
                recipientId:
                    (results.rows[0] && results.rows[0].recipient_id) || null
            };
        })

        .catch(error => {
            console.log(error);
        });
};

exports.sendFriendRequest = function(sender_id, recipient_id, status) {
    return db
        .query(
            `INSERT INTO friendships (sender_id, recipient_id, status)
            VALUES ($1, $2, $3)
            `,
            [sender_id, recipient_id, status]
        )
        .then(results => {
            return results.rows[0];
        })
        .catch(error => {
            console.log(error);
        });
};

exports.updateFriendRequest = function(sender_id, recipient_id, status) {
    return db
        .query(
            `UPDATE friendships
            SET status = $1
            WHERE (recipient_id = $2 OR sender_id = $2)
            AND (recipient_id = $3 OR sender_id = $3)
            RETURNING *`,
            [status, recipient_id, sender_id]
        )
        .then(results => {
            return results.rows[0];
        })
        .catch(error => {
            console.log(error);
        });
};

exports.friendReqsAndFriendsList = function(id) {
    return db
        .query(
            `SELECT users_data.id, users_data.first_name, users_data.last_name, users_data.profile_pic, friendships.status
    FROM friendships
    JOIN users_data
    ON (status = 1 AND recipient_id = $1 AND sender_id = users_data.id)
    OR (status = 2 AND recipient_id = $1 AND sender_id = users_data.id)
    OR (status = 2 AND sender_id = $1 AND recipient_id = users_data.id)`,
            [id]
        )
        .then(results => {
            return results.rows;
        })
        .catch(error => {
            console.log(error);
        });
};
