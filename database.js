const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);


exports.getUser = function(first_name, last_name, email, password_hash) {
    return db
        .query(
            `INSERT INTO users_data (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)`,
            [first_name, last_name, email, password_hash]
        )
        .then(function(results) {
            return results.rows[0];
        });
};
