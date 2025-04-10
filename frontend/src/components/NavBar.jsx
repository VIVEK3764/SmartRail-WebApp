import { Link } from 'react-router-dom';
import './NavBar.css'; // optional, if you want to style it
import logo from "../assets/download.png"
function NavBar() {
  return (
    <nav className="navbar">
    <div className="logo">
        <img src={logo} alt="Railway System Logo" className="logo-img" />
        <span>Railway System</span>
      </div>
      <ul className="nav-links">
        <li className = "nav-box"><Link to="/">Home</Link></li>
        <li className = "nav-box"><Link to="/findtrain">Book Tickets</Link></li>
        <li className = "nav-box"><Link to ="/aboutus">Live Train Status</Link></li>
        <li className = "nav-box"><Link to ="/aboutus">About Us</Link></li>
        <li className = "nav-box"><Link to ="/Signup">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
