import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchByLocation() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function SearchTrain(e) {
    e.preventDefault();

    const locationDetails = {
      from,
      to
    };

    navigate("/traindetails", {
      state: {
        mode: "Location",
        details: locationDetails
      }
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
            type="text"
            placeholder="Enter Date (dd/mm/yy)"
            className="search-input"
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

  function SearchTrain(e) {
    e.preventDefault();

    navigate("/traindetails", {
      state: {
        mode: "Number",
        details: number
      }
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
            type="text"
            placeholder="Enter Date (dd/mm/yy)"
            className="search-input"
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

  function SearchTrain(e) {
    e.preventDefault();

    navigate("/traindetails", {
      state: {
        mode: "Name",
        details: name
      }
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
            type="text"
            placeholder="Enter Date (dd/mm/yy)"
            className="search-input"
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
