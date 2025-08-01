const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'awan123', 
    database: 'mydb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Terhubung ke database MySQL!');
});

app.listen(3000, () => console.log('Server berjalan di port 3000'));

app.get('/', (req, res) => {
    connection.query('SELECT * FROM Produk', (err, produk) => {
        if (err) throw err;
        connection.query('SELECT * FROM Stock_Produk', (err, stok) => {
            if (err) throw err;
            connection.query('SELECT * FROM Pembelian', (err, pembelian) => {
                if (err) throw err;
                res.render('index', { produk, stok, pembelian });
            });
        });
    });
});

app.post('/pembelian', (req, res) => {
    const { id_produk, jumlah } = req.body;
    connection.query('INSERT INTO Pembelian (id_produk, jumlah) VALUES (?, ?)', [id_produk, jumlah], (err) => {
        if (err) throw err;
        connection.query('UPDATE Stock_Produk SET jumlah_stok = jumlah_stok - ? WHERE id_produk = ?', [jumlah, id_produk], (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});

app.get('/cancel/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT id_produk, jumlah FROM Pembelian WHERE id_pembelian = ?', [id], (err, result) => {
        if (err) throw err;
        const { id_produk, jumlah } = result[0];
        connection.query('DELETE FROM Pembelian WHERE id_pembelian = ?', [id], (err) => {
            if (err) throw err;
            connection.query('UPDATE Stock_Produk SET jumlah_stok = jumlah_stok + ? WHERE id_produk = ?', [jumlah, id_produk], (err) => {
                if (err) throw err;
                res.redirect('/');
            });
        });
    });
});