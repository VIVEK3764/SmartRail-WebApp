import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios" 

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
      const response = await axios.post("http://localhost:5000/findtrain", {
        searchType: "location",
        From: from,
        To: to,
        Date: date
      });
      
      if (response.data && response.data.length > 0) {
        setTrains(response.data);
        console.log("Found trains:", response.data);
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
                  <span className="train-name">{train.name || train.number}</span>
                  <span className="train-route">{train.from} → {train.to}</span>
                  <span className="train-time">Departure: {new Date(train.date).toLocaleTimeString()}</span>
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
      const response = await axios.post("http://localhost:5000/findtrain", {
        searchType: "number",
        From: number, // Using From field to search by train number
        Date: date
      });
      
      if (response.data && response.data.length > 0) {
        setTrains(response.data);
        console.log("Found trains:", response.data);
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
                  <span className="train-name">{train.name || train.number}</span>
                  <span className="train-route">{train.from} → {train.to}</span>
                  <span className="train-time">Departure: {new Date(train.date).toLocaleTimeString()}</span>
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
      const response = await axios.post("http://localhost:5000/findtrain", {
        searchType: "name",
        From: name, // Using From field to search by train name
        Date: date
      });
      
      if (response.data && response.data.length > 0) {
        setTrains(response.data);
        console.log("Found trains:", response.data);
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
                  <span className="train-name">{train.name || train.number}</span>
                  <span className="train-route">{train.from} → {train.to}</span>
                  <span className="train-time">Departure: {new Date(train.date).toLocaleTimeString()}</span>
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
