import { useState } from 'react';
import './findtrain.css'
function FindTrain() {

  const [From,setFrom]=useState('');
  const [To,setTo]=useState('');
  const [Date,setDate]=useState('');

  function SearchTrain(e) {
    e.preventDefault(); // prevent refresh
    alert("Tuh Hai Kon BKL");
  }

  return (
    <div className="find-train-page">
        <h2>Search For Train</h2>
        <div>

            <form className="locationDetails" onSubmit={SearchTrain}>

                <input
                type="text"
                placeholder="From"
                className="search-input"
                value={From}
                onChange={(e) => setFrom(e.target.value)}
                />

              <div className = "Arrow"> →  </div>
                <input
                type="text"
                placeholder="To"
                className="search-input"
                value={To}
                onChange={(e) => setTo(e.target.value)}
                />

                <input type="text"
                placeholder="Enter Date (dd/mm/yy)"
                className="search-input"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
                />


              <button type="submit" className="Search"> Search </button>

            </form>

        </div>
        
    </div>
  );
}

export default FindTrain;
