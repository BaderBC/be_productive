/*
## lines bellow are commented because postgresql doesn't allow to drop database when something is connected

DROP DATABASE IF EXISTS be_productive;
CREATE DATABASE be_productive;
*/
CREATE TABLE users
(
    email           varchar(254) NOT NULL PRIMARY KEY,
    firstname       varchar(40),
    lastname        varchar(40),
    hashed_password varchar      NOT NULL
);

CREATE TABLE activities
(
    activity_id              serial PRIMARY KEY,
    name                     varchar(100) NOT NULL,
    time_to_spend_weekly     int          NOT NULL,
    user_email               varchar(254) NOT NULL,
    time_spent_ms            int      DEFAULT 0,
    week_number_after_update smallint DEFAULT date_part('week', NOW()),
    session_start            timestamp,
    UNIQUE (user_email, name),
    FOREIGN KEY (user_email) REFERENCES users (email)
);

/*
CREATE TABLE time_spent_this_week
(
    activity_id              int      NOT NULL UNIQUE,
    FOREIGN KEY (activity_id) REFERENCES activities (activity_id)
);
 */

CREATE OR REPLACE FUNCTION update_week_number()
    RETURNS TRIGGER AS
$update_week_number$
BEGIN
    NEW.week_number_after_update = date_part('week', NOW());

    IF (NEW.week_number_after_update !=
        (SELECT activities.week_number_after_update FROM activities AS a WHERE NEW.activity_id = a.activity_id))
    THEN
        NEW.time_spent_ms = 0;
    END IF;
    RETURN NEW;
END;
$update_week_number$ LANGUAGE plpgsql;


CREATE TRIGGER update_week_number
    AFTER UPDATE
    ON activities
    FOR EACH ROW
EXECUTE PROCEDURE update_week_number();


/* Queries for tests: */

INSERT INTO users (email, hashed_password)
VALUES ('test@example.com', 'lasdkfjhadsf');

INSERT INTO activities (name, time_to_spend_weekly, user_email)
VALUES ('gotowanie', 12 * 60 * 60 * 1000, 'test@example.com');

/*
INSERT INTO time_spent_this_week (activity_id, time_spent_ms)
VALUES (1, 1 * 60 * 60 * 1000);
 */

UPDATE activities
SET time_spent_ms = 2 * 60 * 60 * 1000
WHERE activity_id = 1;

SELECT *
FROM users;
SELECT *
FROM activities;

SELECT *
FROM activities
WHERE user_email = 'niejakibader@gmail.com';
