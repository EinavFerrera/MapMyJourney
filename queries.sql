--Reuired Queries--
DROP TABLE IF EXISTS visited_countries, users;

CREATE TABLE members(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
visiter INTEGER REFERENCES members(id),
UNIQUE country_code,visiter
);

CREATE TABLE countries(
id SERIAL PRIMARY KEY,
country_code  CHAR(2) UNIQUE NOT NULL,
country_name VARCHAR(100)
);