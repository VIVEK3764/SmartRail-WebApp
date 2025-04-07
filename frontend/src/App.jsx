import { useState } from 'react';
import './App.css';
import Home from "./pages/Home";
import FindTrain from "./pages/findtrain";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Trains from "./pages/DisplayTrain";

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
