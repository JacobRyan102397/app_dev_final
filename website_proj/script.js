// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to backend
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        // Handle login response from backend
        if (data.success) {
            // Redirect to homepage or other protected page
            window.location.href = '/homepage.html';
        } else {
            // Display error message
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Send registration request to backend
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })
    .then(response => response.json())
    .then(data => {
        // Handle registration response from backend
        if (data.success) {
            // Redirect to login page or other appropriate page
            window.location.href = 'login.html';
        } else {
            // Display error message
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

app.use(bodyParser.json());

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Authenticate user (replace with your authentication logic)
    if (username === 'user' && password === 'password') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Register route
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Create user account (replace with your user creation logic)
    // ...

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Here, you would perform the actual login check (e.g., using AJAX to send credentials to the server)
    // For demonstration purposes, let's simulate a successful/unsuccessful login

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'validuser' && password === 'validpassword') {
        // Successful login
        // Redirect to the desired page
        window.location.href = 'dashboard.html'; // Replace with the actual dashboard URL
    } else {
        // Invalid credentials
        alert('Invalid username or password.'); 
    }
});