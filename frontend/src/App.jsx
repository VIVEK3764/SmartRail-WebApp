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

function DisplayTrainWrapper() {
  const { state } = useLocation(); // Access state passed from navigate
  return <Trains mode={state?.mode} details={state?.details} />;
}


function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false); // Track user auth status

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsUserAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  return (
    <main className="main-content">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findtrain" element={<FindTrain />} />

        <Route path="/Signup" element={<Signup />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/traindetails" element={<DisplayTrainWrapper />} />

        <Route path="/traindetails" element={<DisplayTrainWrapper />} />
        <Route path="/Emailverification" element={<EmailVerification />} />
        <Route
          path="/profile"
          element={isUserAuthenticated ? <Profile /> : <Login />}
        />
      </Routes>
    </main>
  );
}

export default App;
