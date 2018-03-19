DROP TABLE IF EXISTS users_data;
DROP TABLE IF EXISTS friendships;

CREATE TABLE users_data (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (200) NOT NULL,
    last_name VARCHAR (200) NOT NULL,
    email VARCHAR (200) NOT NULL UNIQUE,
    password_hash VARCHAR (200) NOT NULL,
    profile_pic VARCHAR (300),
    bio VARCHAR (2000),
    created_at TIMESTAMP DEFAULT current_timestamp
);



    CREATE TABLE friendships (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER NOT NULL,
        recipient_id INTEGER NOT NULL,
        status INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP DEFAULT current_timestamp
);
