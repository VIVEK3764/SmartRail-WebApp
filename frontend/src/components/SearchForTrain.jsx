import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import "./SearchForTrain.css";

const API_BASE_URL = "http://localhost:5000";

function TrainCard({ train }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    const bookingParams = new URLSearchParams({
      train_number: train.train_number,
      train_name: train.train_name,
      source_code: train.source_code,
      source_name: train.source_station_name,
      destination_code: train.destination_code,
      destination_name: train.destination_station_name,
      display_date: new Date(train.date).toLocaleDateString('en-GB')
    });

    navigate(`/booking?${bookingParams.toString()}`);
  };

  return (
    <div className="train-card">
      <div className="train-header">
        <div className="train-primary-info">
          <h2 className="train-name">{train.train_name}</h2>
          <span className="train-number">#{train.train_number}</span>
        </div>
        <div className="train-meta">
          <span className="distance">
            <i className="fas fa-route"></i> {train.distance} km
          </span>
          <span className="date">
            <i className="far fa-calendar"></i> {new Date(train.date).toLocaleDateString('en-GB')}
          </span>
        </div>
      </div>

      <div className="journey-details">
        <div className="station-info source">
          <div className="time">{train.departure_time}</div>
          <div className="station-details">
            <div className="station-name">{train.source_station_name}</div>
            <div className="station-code">{train.source_code}</div>
          </div>
        </div>

        <div className="journey-duration">
          <div className="duration-line">
            <div className="dot start"></div>
            <div className="line"></div>
            <div className="dot end"></div>
          </div>
        </div>

        <div className="station-info destination">
          <div className="time">{train.arrival_time}</div>
          <div className="station-details">
            <div className="station-name">{train.destination_station_name}</div>
            <div className="station-code">{train.destination_code}</div>
          </div>
        </div>

        <button onClick={handleBooking} className="book-button">
          Book Now <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

function SearchByLocation() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const SearchTrain = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/findtrain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchType: "location",
          From: from,
          To: to,
          Date: date
        }),
      });

      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setTrains(data.data);
        setMessage("Search completed successfully");
      } else {
        setError("No trains found for the given route");
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      setError(error.response?.data?.message || "Failed to search trains. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-form">
        <form onSubmit={SearchTrain}>
          <div className="form-group">
            <label>Source Station:</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Destination Station:</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Date of Travel:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="search-trains-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Trains'}
          </button>
        </form>
      </div>

      {message && <div className="success-alert">{message}</div>}
      {error && <div className="error-alert">{error}</div>}

      {trains.length > 0 && (
        <div className="trains-list">
          <h2>Available Trains:</h2>
          {trains.map((train, index) => (
            <TrainCard key={index} train={train} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchByNumber() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function SearchTrain(e) {
    e.preventDefault();
    setError("");
    setTrains([]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/findtrain`, {
        searchType: "number",
        Number: number,
        Date: date
      });

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        setTrains(response.data.data);
        console.log("Found trains:", response.data.data);
      } else {
        setError("No trains found with the given number");
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      setError(error.response?.data?.message || "Failed to search trains. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="SearchNumber" onSubmit={SearchTrain}>
        <div className="TrainNumber">
          <input
            type="text"
            placeholder="Enter Train Number"
            className="search-input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <div className="Date">
          <input
            type="date"
            placeholder="Enter Date"
            className="search-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="Search" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {trains.length > 0 && (
        <div className="search-results">
          <h3>Available Trains:</h3>
          <div className="train-list">
            {trains.map((train, index) => (
              <TrainCard key={index} train={train} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchByName() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function SearchTrain(e) {
    e.preventDefault();
    setError("");
    setTrains([]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/findtrain`, {
        searchType: "name",
        Name: name,
        Date: date
      });

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        setTrains(response.data.data);
        console.log("Found trains:", response.data.data);
      } else {
        setError("No trains found with the given name");
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      setError(error.response?.data?.message || "Failed to search trains. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="SearchName" onSubmit={SearchTrain}>
        <div className="TrainName">
          <input
            type="text"
            placeholder="Enter Train Name"
            className="search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="Date">
          <input
            type="date"
            placeholder="Enter Date"
            className="search-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="Search" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {trains.length > 0 && (
        <div className="search-results">
          <h3>Available Trains:</h3>
          <div className="train-list">
            {trains.map((train, index) => (
              <TrainCard key={index} train={train} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { SearchByLocation, SearchByName, SearchByNumber };
