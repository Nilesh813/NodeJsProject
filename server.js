const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and serving static files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Replace with your MySQL password
    database: 'user_data'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// API route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        return res.json({ message: 'User data saved successfully!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
