import TrainCard from "./Components/TrainCard"

function DisplayTrain()
{
    const Trains = [
        { id: 1, Name: "Farakka Express", Number: "1234665", from: "Kolkata", to: "Delhi" },
        { id: 2, Name: "Virbhumi Express", Number: "12909065", from: "Ahmedabad", to: "Varanasi" },
        { id: 3, Name: "Bihar Express", Number: "3249283", from: "Patna", to: "Delhi" },
        { id: 4, Name: "Kishuuu Express", Number: "10238498", from: "Bangalore", to: "Pune" }
    ]
    return <div>
        <div className = "TrainGrid">
            {Trains.map (Train => <TrainCard TrainDetails = {Train}/>)}
        </div>
    </div>
}

export default DisplayTrain