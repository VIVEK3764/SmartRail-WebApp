import { useState, useEffect } from 'react';
import './App.css';
import Home from "./pages/Home";
import FindTrain from "./pages/findtrain";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Trains from "./pages/DisplayTrain";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import EmailVerification from "./pages/EmailVerification"
import Profile from "./pages/profile"
import { isAuthenticated } from "./AuthContext";
import { SearchByLocation, SearchByName, SearchByNumber } from './components/SearchForTrain';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';

function DisplayTrainWrapper() {
  const { state } = useLocation();
  return <Trains mode={state?.mode} details={state?.details} />;
}

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsUserAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<FindTrain />} />
        <Route path="/search-by-location" element={<SearchByLocation />} />
        <Route path="/search-by-name" element={<SearchByName />} />
        <Route path="/search-by-number" element={<SearchByNumber />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/profile" element={isUserAuthenticated ? <Profile /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
