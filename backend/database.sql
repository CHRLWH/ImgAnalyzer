CREATE DATABASE IF NOT EXISTS flask;
USE flask;

CREATE TABLE IF NOT EXISTS image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(100),
    name VARCHAR(100),
    value INT,
    description VARCHAR(255),
    date VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT
);
