const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('./models/routes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/trainbooking')
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    console.error("Please make sure MongoDB is installed and running on your system.");
    console.error("You can install MongoDB from: https://www.mongodb.com/try/download/community");
    console.error("Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas/register");
  });

// Basic Route
app.get('/', (req, res) => {
  res.send("Server is up");
});


app.post('/findtrain', async (req, res) => {
    const { From, To, Date } = req.body;
    // const { Name, To, Date } = req.body;
    // const { From, To, Date } = req.body;
  
    try {
      // Construct the query object
      const query = {};
      if (From) query.from = From;
      if (To) query.to = To;
      if (Date) {
        // Assuming Date is in 'YYYY-MM-DD' format
        const dateObj = new Date(Date);
        query.date = {
          $gte: new Date(dateObj.setHours(0, 0, 0, 0)), // Start of the day
          $lt: new Date(dateObj.setHours(23, 59, 59, 999)) // End of the day
        };
      }
  
      // Query the database for matching train records
      const trains = await Route.find(query);
  
      // Send the found trains as a JSON response
      res.json(trains);
    } catch (error) {
      console.error('Error fetching trains:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });