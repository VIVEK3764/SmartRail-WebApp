import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./pages/Home"
import FindTrain from  "./pages/findtrain"
import {Routes , Route} from "react-router-dom"
import NavBar from "./components/NavBar"
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className = "main-content">
    <NavBar/>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/findtrain" element = {<FindTrain/>}/>
    </Routes>
  </main>
  )
}

export default App
