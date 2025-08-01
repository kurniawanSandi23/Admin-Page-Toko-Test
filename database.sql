CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

CREATE TABLE Produk (
    id_produk INT PRIMARY KEY AUTO_INCREMENT,
    nama_produk VARCHAR(100) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Stock_Produk (
    id_produk INT PRIMARY KEY,
    jumlah_stok INT NOT NULL,
    FOREIGN KEY (id_produk) REFERENCES Produk(id_produk)
);

CREATE TABLE Pembelian (
    id_pembelian INT PRIMARY KEY AUTO_INCREMENT,
    id_produk INT NOT NULL,
    jumlah INT NOT NULL,
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (id_produk) REFERENCES Produk(id_produk)
);

INSERT INTO Produk (nama_produk, harga) VALUES
('Laptop Gaming', 15000.00),
('Smartphone X', 8000.00),
('Headphone Wireless', 1200.00),
('Monitor 24"', 2500.00),
('Keyboard Mechanical', 800.00),
('Mouse Gaming', 500.00),
('External HDD 1TB', 700.00),
('USB-C Cable', 150.00),
('Webcam HD', 600.00),
('Speaker Bluetooth', 900.00);

INSERT INTO Stock_Produk (id_produk, jumlah_stok) VALUES
(1, 50),
(2, 30),
(3, 100),
(4, 20),
(5, 80),
(6, 120),
(7, 40),
(8, 200),
(9, 60),
(10, 90);