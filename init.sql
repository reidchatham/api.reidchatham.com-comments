CREATE DATABASE books_api;
\c books_api

CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter');



CREATE DATABASE comments_api;

\c comments;

CREATE TABLE comments (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMPTZ DEFAULT Now(),
  slug VARCHAR(255) NOT NULL,
  parent_comment_id INTEGER,
  text VARCHAR(5000) NOT NULL
);

INSERT INTO
  comments (name, text, slug, parent_comment_id)
VALUES
  ('Bogus', 'Testing the comments API', 'how-to-bake-a-cake', null);



CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;

CREATE DATABASE api;
GRANT ALL PRIVILEGES ON DATABASE api TO me;
\c api

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO users (name, email)
  VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');
