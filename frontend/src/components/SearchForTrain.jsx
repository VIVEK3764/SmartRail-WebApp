import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios" 

function SearchByLocation() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  function SearchTrain(e) {
    e.preventDefault();

    axios.post("http://localhost:5000/search", (req, res) => {
      const { mode, details, date } = req.body;
    
      if (mode === "Location") {
        const { from, to } = details;
        
      
      } else if (mode === "Number") {
        const trainNumber = details;
        
        
      } else if (mode === "Name") {
        const trainName = details;
        
        
      } else {
        return res.status(400).json({ error: "Invalid mode" });
      }
    
      // res.json({ results: /* your query result */ });

    });
    
  }

  return (
    <div>
      <form className="SearchLocation" onSubmit={SearchTrain}>
        <div className="locationDetails">
          <input
            type="text"
            placeholder="From"
            className="search-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <div className="Arrow">→</div>
          <input
            type="text"
            placeholder="To"
            className="search-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="Date">
          <input
            type="date"
            placeholder="Enter Date (dd/mm/yy)"
            className="search-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="Search">
          Search
        </button>
      </form>
    </div>
  );
}

function SearchByNumber() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");

  function SearchTrain(e) {
    e.preventDefault();

    axios.post("http://localhost:5000/search", (req, res) => {
      const { mode, details, date } = req.body;
    
      if (mode === "Location") {
        const { from, to } = details;
        
      
      } else if (mode === "Number") {
        const trainNumber = details;
        
        
      } else if (mode === "Name") {
        const trainName = details;
        
        
      } else {
        return res.status(400).json({ error: "Invalid mode" });
      }
    
      // res.json({ results: /* your query result */ });

    });
    
  }

  return (
    <div>
      <form className="SearchNumber" onSubmit={SearchTrain}>
        <div className="TrainNumber">
          <input
            type="text"
            placeholder="Train Number"
            className="search-input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="Date">
          <input
            type="date"
            placeholder="Enter Date (dd/mm/yy)"
            className="search-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="Search">
          Search
        </button>
      </form>
    </div>
  );
}

function SearchByName() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  function SearchTrain(e) {
    e.preventDefault();

    axios.post("http://localhost:5000/search", (req, res) => {
      const { mode, details, date } = req.body;
    
      if (mode === "Location") {
        const { from, to } = details;
        
      
      } else if (mode === "Number") {
        const trainNumber = details;
        
        
      } else if (mode === "Name") {
        const trainName = details;
        
        
      } else {
        return res.status(400).json({ error: "Invalid mode" });
      }
    
      // res.json({ results: /* your query result */ });

    });
    
  }

  return (
    <div>
      <form className="SearchName" onSubmit={SearchTrain}>
        <div className="TrainName">
          <input
            type="text"
            placeholder="Train Name"
            className="search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="Date">
          <input
            type="date"
            placeholder="Enter Date (dd/mm/yy)"
            className="search-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="Search">
          Search
        </button>
      </form>
    </div>
  );
}

export { SearchByLocation, SearchByName, SearchByNumber };
