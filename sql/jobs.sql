
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR (300),
    description VARCHAR (10000),
    location VARCHAR (2000),
    contact VARCHAR (300),
    created_at TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO jobs (job_title, description, location, contact) VALUES ('Retreat job near jungle', 'Are you a motivated instructor looking to host a retreat in beautiful Costa Rica? If so, we have the perfect place for you in a remote, scenic area in the jungle, surrounded by lush greenery.

We believe yoga and travel should be accessible to everyone! That’s why we offer a budget option for retreat organizers to allow for more people to take advantage of the incredible healing and rejuvenation that takes place while being surrounded by nature.', 'Costa Rica', 'costa@gmail.com');
INSERT INTO jobs (job_title, description, location, contact) VALUES ('Spiritual Music Festival Organiser Wanted For The UK', 'We are looking for an experienced event organiser to help setup a unique pop up boutique festival that covers music + Spiritualism and generates funds for a good cause here in England targeting the “homeless” and specifically those sleeping rough on our streets. Upon the successful completion of the festival the festival organiser shall be paid a bonus, determined by the festival promoters.', 'UK', 'talktous@gmail.com');
INSERT INTO jobs (job_title, description, location, contact) VALUES ('Yoga Teacher needed ASAP - Wir brauchen ein/eine Yogalehrer/in so schnell wie möglich', 'We need a yoga teacher ASAP in trendy studio in Berlin-Mitte', 'Berlin, Germany', 'kontakt@gmail.com');
INSERT INTO jobs (job_title, description, location, contact) VALUES ('Yogi Chef needed for our Retreat located near the beach', 'Vegetarian – Vegan Chef needed – sooner than later

do you dream of living and working in Portugal in a Guesthouse, near Ericeira, enjoying all the ups and downs of this lifestyle', 'Portugal', 'contactus@gmail.com');
