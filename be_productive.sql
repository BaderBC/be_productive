/*
## lines bellow are commented because postgresql doesn't allow to drop database when something is connected

DROP DATABASE IF EXISTS be_productive;
CREATE DATABASE be_productive;
*/
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    email varchar(254) NOT NULL UNIQUE,
    firstname varchar(40),
    lastname varchar(40),
    hashed_password varchar NOT NULL
);

CREATE TABLE activities (
    activity_id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    time_to_spend_weekly interval NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE time_spent_this_week (
    activity_id int NOT NULL UNIQUE,
    time_spent_ms int NOT NULL,
    week_number_after_update smallint NOT NULL DEFAULT date_part('week', NOW()),
    session_start timestamp,
    FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
);

CREATE OR REPLACE FUNCTION update_week_number()
    RETURNS TRIGGER AS $update_week_number$
    BEGIN
        NEW.week_number_after_update = date_part('week', NOW());
        RETURN NEW;
    END;
    $update_week_number$ LANGUAGE plpgsql;


CREATE TRIGGER update_week_number AFTER UPDATE
    ON time_spent_this_week FOR EACH ROW
    EXECUTE PROCEDURE update_week_number();


/* Queries for tests: */

INSERT INTO users (email, hashed_password)
    VALUES ('test@example.com', 'lasdkfjhadsf');

INSERT INTO activities (name, time_to_spend_weekly, user_id)
    VALUES ('gotowanie', '12h', 1);

INSERT INTO time_spent_this_week (activity_id, time_spent_ms)
    VALUES (1, 1 * 60 * 60 * 1000);

UPDATE time_spent_this_week
    SET time_spent_ms = 2 * 60 * 60 * 1000
    WHERE activity_id = 1;

SELECT * FROM users;
SELECT * FROM activities;
SELECT * FROM time_spent_this_week;
