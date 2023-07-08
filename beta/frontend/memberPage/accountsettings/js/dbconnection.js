const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aws_users_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/user/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.patch('/user/:id', (req, res) => {
    const sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
