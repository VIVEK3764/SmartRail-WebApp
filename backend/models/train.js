const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    train_no: {
        type: String,
        required: true,
        unique: true
    },
    train_name: {
        type: String,
        required: true
    },
    islno: {
        type: Number,
        required: true
    },
    station_code: {
        type: String,
        required: true
    },
    station_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: null,
        required: true
    },
    arrival_time: {
        type: String,
        required: true
    },
    departure_time: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    source_station_code: {
        type: String,
        required: true
    },
    source_station_name: {
        type: String,
        required: true
    },
    destination_station_code: {
        type: String,
        required: true
    },
    destination_station_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;