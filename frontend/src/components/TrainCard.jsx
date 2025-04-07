function TrainCard({ TrainDetails }) {
    return (
      <div className="TrainCard">
        <h3>{TrainDetails.Name}</h3>
        <p>Number: {TrainDetails.Number}</p>
      </div>
    );
  }
  
  export default TrainCard;
  