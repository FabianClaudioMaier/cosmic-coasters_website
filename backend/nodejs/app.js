require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());


console.log(process.env.DATABASE_HOST);
console.log(process.env.DATABASE_PORT);
console.log(process.env.DATABASE_USER);
console.log(process.env.DATABASE_PASSWORD);
console.log(process.env.DATABASE_NAME);

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password:'admin',
    database: 'asw_users_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/register', (req, res) => {
    const { firstname, lastname, username, password1, password2 } = req.body;

    // Server-side validation
    // Add any additional server-side validation here if needed

    // Check if the user already exists
    const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(userExistsQuery, [username], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ errors: ['An error occurred while checking for existing users.'] });
            return;
        }

        if (result.length > 0) {
            res.status(409).json({ errors: ['Username already exists.'] });
            return;
        }

        const email = firstname + '.' + lastname + '@stud.fh-campuswien.ac.at';
        const is_locked = 0;
        // Insert the user into the database
        const insertUserQuery = 'INSERT INTO users (username, email, password, first_name, last_name, is_locked) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertUserQuery, [username, email, password1, firstname, lastname, is_locked], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ errors: ['An error occurred while registering the user.'] });
                return;
            }

            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate user input
    if (!username || !password) {
        res.status(400).json({ errors: ['Please provide both username and password.'] });
        return;
    }

    // Check if the user exists and the password is correct
    const userQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(userQuery, [username], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ errors: ['An error occurred while checking the user.'] });
            return;
        }

        if (result.length === 0 || result[0].password !== password) {
            res.status(401).json({ errors: ['Invalid username or password.'] });
            return;
        }

        // The user exists and the password is correct, create a JSON Web Token
        const user = result[0];
        const token = jwt.sign(
            { id: user.id, username: user.username },
            'aZ9%$hfG4&&mM7@r^wU*1pDz(8t_c,',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login successful.' });
    });
});


const PORT = 8889 || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

