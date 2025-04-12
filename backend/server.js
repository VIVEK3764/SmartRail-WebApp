const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('./models/routes');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const userRoute = require('./routes/auth');
const findtrain = require('./routes/findtrain');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    console.error("Please make sure MongoDB is installed and running on your system.");
    console.error("You can install MongoDB from: https://www.mongodb.com/try/download/community");
    console.error("Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas/register");
  });

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/findtrain", findtrain);

app.use("/auth", userRoute);

// Test route
app.get('/', (req, res) => {
  res.cookie("name", "harsh");
  res.send("Server is running");
});

app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("read page");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});