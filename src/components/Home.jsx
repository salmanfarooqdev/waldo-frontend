import Card from "./Card";
import games from "../games";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <>
      <main>
        <nav>
        <Link to={`/`}>
          <button className="leaderboard-btn">Wheres Waldo</button>
          </Link>
          <Link to={`/leaderboard`}>
          <button className="leaderboard-btn">Leaderboard</button>
          </Link>
        </nav>
        <h1 className="games">Games</h1>

        <div className="home-container">
          {Object.keys(games).map((gameId) => (
            <Card key={gameId} game={games[gameId]}/>
          ))}
        </div>
      </main>
    </>
  );
}
