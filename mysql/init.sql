CREATE DATABASE IF NOT EXISTS atm;
USE atm;

CREATE TABLE Pengguna (
  ID varchar(255) NOT NULL UNIQUE,
  Nama varchar(255) NOT NULL,
  Pin char(6) NOT NULL
);

INSERT INTO Pengguna
VALUES ('123abc', 'Richard', '123456');


