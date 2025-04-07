import { useState } from 'react';
import './App.css';
import Home from "./Pages/Home";
import FindTrain from "./Pages/BookTickets";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Trains from "./Pages/DisplayTrain";

function DisplayTrainWrapper() {
  const { state } = useLocation(); // Access state passed from navigate
  return <Trains mode={state?.mode} details={state?.details} />;
}

function App() {
  return (
    <main className="main-content">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findtrain" element={<FindTrain />} />
        <Route path="/traindetails" element={<DisplayTrainWrapper />} />
      </Routes>
    </main>
  );
}

export default App;
