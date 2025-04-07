const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  trainName: String,
  from: String,
  to: String,
  date: String,
  departureTime: String,
  arrivalTime: String
});

module.exports = mongoose.model('Route', RouteSchema);
