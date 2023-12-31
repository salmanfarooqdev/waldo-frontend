import Card from "./Card";
import games from "../games";
import LeadCard from "./LeadCard";
import { useState } from "react";
import LeaderboardTable from "./LeaderboardTable";
import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";


export default function Leaderboard()
{
    const [selectedGameId, setSelectedGameId] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);

    const handleSelectGame = (gameId) => {
        setSelectedGameId(gameId);
      };

    useEffect(()=>{

        const getLeaderboardData = async () => {
            try {
              const response = await fetch(`https://waldo-clone-d1cae75d0e6b.herokuapp.com/${selectedGameId}/leaderboard`);
      
              if (!response.ok) {
                throw new Error("Failed to get leaderboard.");
              }
      
              const data = await response.json();
              setLeaderboard(data.leaderboard);
            } catch (error) {
              console.error("Error fetching data:", error.message);
            }
          };
      
          getLeaderboardData();

    },[selectedGameId])


    return (
       <>
       <main>
        <nav>
        <Link to={`/`}>
          <button className="leaderboard-btn">Wheres Waldo</button>
          </Link>
          <button className="leaderboard-btn">Leaderboard</button>
        </nav>
        <h1 className="games">Games</h1>
        <div className="home-container">
          {Object.keys(games).map((gameId) => (
            <LeadCard key={gameId} 
            gameId = {gameId}
            game={games[gameId]} 
            onSelectGame={handleSelectGame}/>
          ))}

        </div>
        <div className='leaderboard'>
        {selectedGameId !== null ? ( <LeaderboardTable gameId={selectedGameId} leaderboardData={leaderboard} /> 
        ) : ( <p>Select a game for leaderboard</p>)}
      </div>

      </main>
       </>
    )
}