import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

const API_BASE_URL = "http://localhost:5000";

function SearchByLocation() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
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
        searchType: "location",
        From: from,
        To: to,
        Date: date
      });

      if (response.data && response.data.data && response.data.data.length > 0) {
        setTrains(response.data.data);
        console.log("Found trains:", response.data.data);
      } else {
        setError("No trains found for the given route");
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      setError("Failed to search trains. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="SearchLocation" onSubmit={SearchTrain}>
        <div className="locationDetails">
          <input
            type="text"
            placeholder="From Station"
            className="search-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
          <div className="Arrow">→</div>
          <input
            type="text"
            placeholder="To Station"
            className="search-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
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
          <ul>
            {trains.map((train, index) => (
              <li key={index} className="train-item">
                <div className="train-info">
                  <span className="train-name">{train.train_name || train.train_number}</span>
                  <span className="train-route">{train.source_station_name} → {train.destination_station_name}</span>
                  <span className="train-time">Departure: {train.departure_time}</span>
                </div>
              </li>
            ))}
          </ul>
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

      if (response.data && response.data.data && response.data.data.length > 0) {
        setTrains(response.data.data);
        console.log("Found trains:", response.data.data);
      } else {
        setError("No trains found with the given number");
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      setError("Failed to search trains. Please try again.");
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
          <ul>
            {trains.map((train, index) => (
              <li key={index} className="train-item">
                <div className="train-info">
                  <span className="train-name">{train.train_name || train.train_number}</span>
                  <span className="train-route">{train.source_station_name} → {train.destination_station_name}</span>
                  <span className="train-time">Departure: {train.departure_time}</span>
                </div>
              </li>
            ))}
          </ul>
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

      if (response.data && response.data.data && response.data.data.length > 0) {
        setTrains(response.data.data);
        console.log("Found trains:", response.data.data);
      } else {
        setError("No trains found with the given name");
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      setError("Failed to search trains. Please try again.");
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
          <ul>
            {trains.map((train, index) => (
              <li key={index} className="train-item">
                <div className="train-info">
                  <span className="train-name">{train.train_name || train.train_number}</span>
                  <span className="train-route">{train.source_station_name} → {train.destination_station_name}</span>
                  <span className="train-time">Departure: {train.departure_time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export { SearchByLocation, SearchByName, SearchByNumber };
