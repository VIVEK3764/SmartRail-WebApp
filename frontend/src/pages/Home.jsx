import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home()
{
    const navigate = useNavigate(); 

    function TaketoFindTrain()
    {
        navigate('/findtrain');
        alert("Gand Mara na")
    }
    return <div className = "Homepage">
        <h1 className = "title">Smart Railway System</h1>
        <p className = "catchphrase">Find The Best Trains Possible for Your Journey</p>
        <button className = "Find" onClick = {TaketoFindTrain}>Find Trains</button>
    </div>
}

export default Home