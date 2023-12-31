import games from "../games";

export default function LeaderboardTable({ gameId, leaderboardData})
{
   
    return(
        <div>
      <h2 className="ll">Leaderboard for {games[gameId].name}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData?.map((data, index) => (
            <tr key={index}>
              <td>{data.username}</td>
              <td>{data.time}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}