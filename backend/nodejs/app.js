const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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
    port: 3306,
    user: 'root',
    password:'',
    database: 'asw_users_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/register', (req, res) => {
    const {firstname, lastname, username, password1} = req.body;

    // Server-side validation
    // Add any additional server-side validation here if needed

    // Check if the user already exists
    const userExistsQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(userExistsQuery, [username], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({errors: ['An error occurred while checking for existing users.']});
            return;
        }

        if (result.length > 0) {
            res.status(409).json({errors: ['Username already exists.']});
            return;
        }

        const email = firstname + '.' + lastname + '@stud.fh-campuswien.ac.at';
        const is_locked = 0;

        // Hash the password
        bcrypt.hash(password1, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                res.status(500).json({errors: ['An error occurred while hashing the password.']});
                return;
            }

            // Insert the user into the database
            const insertUserQuery = 'INSERT INTO users (username, email, password, first_name, last_name, is_locked) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [username, email, hashedPassword, firstname, lastname, is_locked], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({errors: ['An error occurred while registering the user.']});
                    return;
                }

                res.status(201).json({message: 'User registered successfully.'});
            });
        });
    });
});


app.post('/login', (req, res) => {
    const {username, password} = req.body;

    // Validate user input
    if (!username || !password) {
        res.status(400).json({errors: ['Please provide both username and password.']});
        return;
    }

    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(userQuery, [username], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({errors: ['An error occurred while checking the user.']});
            return;
        }

        if (result.length === 0) {
            res.status(401).json({errors: ['Invalid username or password.']});
            return;
        }

        const user = result[0];

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (compareErr, isMatch) => {
            if (compareErr) {
                console.error(compareErr);
                res.status(500).json({errors: ['An error occurred while comparing passwords.']});
                return;
            }

            if (!isMatch) {
                res.status(401).json({errors: ['Invalid username or password.']});
                return;
            }

            // The user exists and the password is correct, create a JSON Web Token
            const token = jwt.sign(
                {id: user.id, username: user.username},
                'aZ9%$hfG4&&mM7@r^wU*1pDz(8t_c,',
                {expiresIn: '1h'}
            );

            res.status(200).json({token, message: 'Login successful.'});
        });
    });
});


// Middleware to validate and extract user information from JWT
    function authenticateToken(req, res, next) {
        // Get the JWT from the request headers or cookies
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({error: 'Unauthorized'});
        }

        // Verify and decode the JWT
        jwt.verify(token, 'aZ9%$hfG4&&mM7@r^wU*1pDz(8t_c,', (err, decodedToken) => {
            if (err) {
                return res.status(403).json({error: 'Invalid token'});
            }

            // Populate req.user with the decoded token payload
            req.user = decodedToken;

            next();
        });
    }

    app.get('/user', authenticateToken, (req, res) => {
        // Extract the user ID from the req.user object
        const userId = req.user.id;

        // Query the database to retrieve the user information
        const userQuery = 'SELECT * FROM users WHERE id = ?';
        db.query(userQuery, [userId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'An error occurred while retrieving user information.'});
                return;
            }

            if (result.length === 0) {
                res.status(404).json({error: 'User not found.'});
                return;
            }

            const user = result[0];
            res.status(200).json({user});
        });
    });


    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });





