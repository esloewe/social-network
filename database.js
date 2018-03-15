const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.insertNewUser = function(first_name, last_name, email, password_hash) {
    return db
        .query(
            `INSERT INTO users_data (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id`,
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
        .query(`SELECT password_hash FROM users_data WHERE email = $1`, [email])
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
            `SELECT first_name, last_name, email, id, profile_pic FROM users_data WHERE email = $1`,
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
        .query(`UPDATE users_data SET profile_pic = $1 WHERE id = $2`, [
            profile_pic,
            id
        ])
        .then(function(results) {
            return results.rows[0];
        })
        .catch(error => {
            console.log(error);
        });
};
