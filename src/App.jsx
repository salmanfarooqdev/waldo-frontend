import { useState } from 'react'
import Home from './components/Home'
import Leaderboard from './components/Leaderboard'
import GamePage from './components/GamePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
           <Route exact path='/' Component={Home} />
           <Route exact path='/leaderboard' Component={Leaderboard} />
           <Route exact path='/game/:gameId' Component={GamePage} />
      </Routes>
    </Router>      
    </>
  )
}

export default App
