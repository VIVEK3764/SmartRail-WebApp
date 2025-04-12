const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Search trains endpoint
app.post('/search-trains', (req, res) => {
    const { sourceStation, destinationStation, travelDate } = req.body;

    if (!sourceStation || !destinationStation || !travelDate) {
        return res.status(400).json({
            success: false,
            message: 'Missing required parameters: sourceStation, destinationStation, and travelDate are required'
        });
    }

    // Call the stored procedure
    const query = 'CALL search_train_by_station2(?, ?, ?)';

    db.query(query, [sourceStation, destinationStation, travelDate], (err, results) => {
        if (err) {
            console.error('Error executing stored procedure:', err);
            return res.status(500).json({
                success: false,
                message: 'Error searching for trains',
                error: err.message
            });
        }

        // The stored procedure returns results in the first element of the results array
        const trains = results[0];
        res.json({
            success: true,
            data: trains
        });
    });
});

// Get all stations endpoint
app.get('/stations', (req, res) => {
    const query = 'SELECT station_id, station_name FROM station ORDER BY station_name';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching stations:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching stations',
                error: err.message
            });
        }
        res.json({
            success: true,
            data: results
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Train Search Server running at http://localhost:${port}`);
}); 