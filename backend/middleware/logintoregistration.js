// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database'); // database interface module

// Create express app
const app = express();

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware function to handle registration requests
app.post('/register', (req, res) => {
    const { firstName, lastName, username, password, repeatPassword } = req.body;

    // Validate form data
    if (!firstName || !lastName || !username || !password || !repeatPassword) {
        res.render('register', { error: 'Please fill in all fields' });
    } else if (password !== repeatPassword) {
        res.render('register', { error: 'Passwords do not match' });
    } else {
        // Call database interface function to register new user
        database.registerUser(firstName, lastName, username, password)
            .then(() => {
                // If registration is successful, redirect to login page
                res.redirect('/login');
            })
            .catch((error) => {
                // If registration fails, render the registration page with an error message
                res.render('register', { error: 'Registration failed' });
            });
    }
});

// Middleware function to handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Call database interface function to verify user's credentials
    database.authenticateUser(username, password)
        .then((user) => {
            // If user is authenticated, redirect to dashboard page
            res.redirect('/dashboard');
        })
        .catch((error) => {
            // If authentication fails, render the login page with an error message
            res.render('login', { error: 'Invalid username or password' });
        });
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});