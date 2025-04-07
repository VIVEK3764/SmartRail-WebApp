const mongoose = require('mongoose');
const Route = require('../models/Train');

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/trainbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = [
  {
    trainName: "Rajdhani Express",
    from: "Delhi",
    to: "Mumbai",
    date: "10/04/25",
    departureTime: "08:00",
    arrivalTime: "18:00"
  },
  {
    trainName: "Shatabdi Express",
    from: "Delhi",
    to: "Lucknow",
    date: "10/04/25",
    departureTime: "06:00",
    arrivalTime: "12:00"
  }
];

Route.insertMany(routes)
  .then(() => {
    console.log("Route data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
