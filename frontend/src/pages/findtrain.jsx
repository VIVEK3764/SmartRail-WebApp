import { useState } from 'react';
import './findtrain.css'

import axios from 'axios';

function FindTrain() {

  const [From,setFrom]=useState('');
  const [To,setTo]=useState('');
  const [Date,setDate]=useState('');

  const [results, setResults] = useState([]);


  function SearchTrain(e) {
    e.preventDefault(); // prevent refresh
    // console.log(From);
    // console.log(To);
    // console.log(Date);
    // alert("Tuh Hai Kon BKL");
    //here 5000 is local host or the sever

    axios.post('http://localhost:5000/search', {
      from: From,
      to: To,
      date: Date
    })
    .then(res => {
      setResults(res.data);  // Save results to state
      console.log(res.data);
    })


  }

  return (

    <div className="find-train-page">
    <h2>Search For Train</h2>
    <div>

    <form className="train-form" onSubmit={SearchTrain}>
  <div className="locationDetails">
    <input
      type="text"
      placeholder="From"
      className="search-input"
      value={From}
      onChange={(e) => setFrom(e.target.value)}
    />
    <div className="Arrow">→</div>
    <input
      type="text"
      placeholder="To"
      className="search-input"
      value={To}
      onChange={(e) => setTo(e.target.value)}
    />
  </div>

  <input
    type="text"
    placeholder="Enter Date (dd/mm/yy)"
    className="search-input"
    value={Date}
    onChange={(e) => setDate(e.target.value)}
  />

  <button type="submit" className="Search">Search</button>
</form>



    </div>

    {/* <button type="submit" className="Search">  Search  </button> */}
        
    </div>
  );
}

export default FindTrain;
