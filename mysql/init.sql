CREATE DATABASE IF NOT EXISTS atm;
USE atm;

CREATE TABLE IF NOT EXISTS Pengguna  (
  ID varchar(255) PRIMARY KEY,
  Nama varchar(255) NOT NULL,
  Pin char(6) NOT NULL,
  Saldo DECIMAL(18,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Transaksi (
  IDTransaksi varchar(255) PRIMARY KEY,
  TanggalTransaksi DATETIME DEFAULT CURRENT_TIMESTAMP,
  IDSumber varchar(255) NOT NULL,
  IDTujuan varchar(255) NOT NULL,
  TujuanTransaksi varchar(255),
  Jumlah DECIMAL(18,2) NOT NULL,
  FOREIGN KEY (IDSumber) REFERENCES Pengguna(ID),
  FOREIGN KEY (IDTujuan) REFERENCES Pengguna(ID)
);

INSERT INTO Pengguna
VALUES ('usr001', 'Richard', '123456', 5000000);


