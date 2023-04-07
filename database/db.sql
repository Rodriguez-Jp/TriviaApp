CREATE DATABASE database_notes;

USE database_notes;

--users table
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL, 
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL  
);

DESCRIBE users;

-- Notes table
CREATE TABLE notes(
    id INT(11)NOT NULL, 
    title VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE notes
    ADD PRIMARY KEY (id);

ALTER TABLE notes
    MODIFY id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE notes
    RENAME COLUMN description TO note;

--Change a column
ALTER TABLE notes
CHANGE COLUMN `description`   -- old name; notice optional backticks
                note        -- new name
                TEXT;