/*
CMPT 350 - Assignment 2
Rohan Patel
11247205
rsp502
*/


CREATE DATABASE IF NOT EXISTS rsp502a2;
USE rsp502a2;

/*
  username -> unique, not null
  firstName -> not null
  lastName -> not null
  phone -> unique
  email -> unique, not null
  password -> not null
  gender: Represented by String -> male,female, and unspecified.
  age -> not null
  PRIMARY KEY -> username
*/

CREATE TABLE IF NOT EXISTS users_info(
  username VARCHAR(25) UNIQUE NOT NULL,
  name VARCHAR(25) NOT NULL,
  lastName VARCHAR(25) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  password VARCHAR(25) NOT NULL,
  phone VARCHAR(45),
  gender VARCHAR(20),
  age INT NOT NULL,
  PRIMARY KEY (username)
);

/*
  contact1 -> not null
  contact2 -> not null
  PRIMARY KEY -> contact1, contact2
  FOREIGN KEYS -> contact1, contact2; both reference username in users_info
*/

CREATE TABLE IF NOT EXISTS contacts(
  contact1 VARCHAR(25) NOT NULL,
  contact2 VARCHAR(25) NOT NULL,
  PRIMARY KEY (contact1, contact2),
  FOREIGN KEY (contact1) REFERENCES users_info(username),
  FOREIGN KEY (contact2) REFERENCES users_info(username)
);

/*
  id -> unique, not null
  sender -> not null
  receiver -> not null
  message -> not null
  moment -> not null
  seenMoment: null if it has not been seen, TIMESTAMP of when it was seen
  PRIMARY KEY -> id
  FOREIGN KEYS -> sender, receiver; both reference username in users
*/

CREATE TABLE IF NOT EXISTS messages(
  id INT UNIQUE NOT NULL,
  sender VARCHAR(25) NOT NULL,
  receiver VARCHAR(25) NOT NULL,
  message VARCHAR(1024) NOT NULL,
  moment TIMESTAMP,
  seenMoment TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES users_info(username),
  FOREIGN KEY (receiver) REFERENCES users_info(username)
);

/*
  id -> unique, not null
  username -> not null
  post -> not null
  moment -> not null
  PRIMARY KEY -> id
  FOREIGN KEY -> username references username in users
*/

CREATE TABLE IF NOT EXISTS posts (
  id INT UNIQUE NOT NULL,
  username VARCHAR(25) NOT NULL,
  post VARCHAR(2500) NOT NULL,
  moment TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (username) REFERENCES users_info(username)
);

/*
  id -> unique, not null
  username -> not null
  post -> not null
  moment -> not null
  PRIMARY KEY -> id
  FOREIGN KEYS -> username references username in users, post references id in
                  posts
*/

CREATE TABLE IF NOT EXISTS likes(
  postid INT UNIQUE NOT NULL,
  username VARCHAR(25) NOT NULL,
  post INT NOT NULL,
  moment TIMESTAMP,
  PRIMARY KEY (postid),
  FOREIGN KEY (username) REFERENCES users_info(username),
  FOREIGN KEY (post) REFERENCES posts(id)
);
