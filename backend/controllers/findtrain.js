const mysql = require('mysql2');
require('dotenv').config();

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
const traininformation = async (req, res) => {

    console.log('Received search request:', req.body);
    
    const { searchType } = req.body;

    if (!searchType) {
        return res.status(400).json({
            success: false,
            message: 'Search type is required'
        });
    }

    try {
        if (searchType === "location") {

            const { From, To, Date } = req.body;

            if (!From || !To || !Date) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required parameters for location search'
                });
            }

            // Call the stored procedure
            const query = 'CALL search_train_by_station2(?, ?, ?)';
            console.log('Executing stored procedure with params:', [From, To, Date]);

            db.query(query, [From, To, Date], (err, results) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error searching trains',
                        error: err.message
                    });
                }

                // The stored procedure returns results in the first element of the results array
                const trains = results[0];
                console.log('Found trains:', trains);

                res.json({
                    success: true,
                    data: trains.map(train => ({
                        train_number: train.train_number,
                        train_name: train.train_name,
                        source_station_name: train.source_name,
                        source_code: train.source_code,
                        destination_station_name: train.destination_name,
                        destination_code: train.destination_code,
                        departure_time: train.departure_time,
                        arrival_time: train.arrival_time,
                        distance: train.distance,
                        date: train.actual_travel_date
                    }))
                });
            });

        } else if (searchType === "number") {

            const { Number, Date } = req.body;

            if (!Number || !Date) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required parameters for number search'
                });
            }

            // Call stored procedure with train number
            const query = 'CALL search_train_by_number(?, ?)';

            db.query(query, [Number, Date], (err, results) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error searching trains',
                        error: err.message
                    });
                }

                const trains = results[0];
                res.json({
                    success: true,
                    data: trains.map(train => ({
                        train_number: train.train_number,
                        train_name: train.train_name,
                        source_station_name: train.source_name,
                        source_code: train.source_code,
                        destination_station_name: train.destination_name,
                        destination_code: train.destination_code,
                        departure_time: train.departure_time,
                        arrival_time: train.arrival_time,
                        distance: train.distance,
                        date: train.actual_travel_date
                    }))
                });
            });

        } else if (searchType === "name") {

            const { Name , Date } = req.body;

            if (!Name || !Date) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required parameters for name search'
                });
            }

            // Call stored procedure with train name
            const query = 'CALL search_train_by_name(?, ?)';

            db.query(query, [Name, Date], (err, results) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error searching trains',
                        error: err.message
                    });
                }

                const trains = results[0];
                res.json({
                    success: true,
                    data: trains.map(train => ({
                        train_number: train.train_number,
                        train_name: train.train_name,
                        source_station_name: train.source_name,
                        source_code: train.source_code,
                        destination_station_name: train.destination_name,
                        destination_code: train.destination_code,
                        departure_time: train.departure_time,
                        arrival_time: train.arrival_time,
                        distance: train.distance,
                        date: train.actual_travel_date
                    }))
                });
            });
        }
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message
        });
    }
};

module.exports={
    traininformation
}