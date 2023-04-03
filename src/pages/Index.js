import { useEffect, useState } from "react";

function Index() {

  const [players, setPlayers] = useState([]);

  const getData = async () => {
    const resp = await fetch('http://localhost:5000/top/players');
    const json = await resp.json();
    setPlayers(json);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Index</h1>
      <table>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>GP</th>
          <th>MIN</th>
          <th>PTS</th>
          <th>REB</th>
          <th>AST</th>
          <th>TOV</th>
          <th>STL</th>
          <th>BLK</th>
          <th>RDEF</th>
          <th>PDEF</th>
          <th>DEF</th>
        </tr>
        {players.map((player, index) => {
          return(
            <tr key={index}>
            <td><a href={`/player/${player.Player}`}>{player.Player}</a></td>
            <td>{player.Team}</td>
            <td>{player.GP}</td>
            <td>{player.MIN}</td>
            <td>{player.PTS}</td>
            <td>{player.REB}</td>
            <td>{player.AST}</td>
            <td>{player.TOV}</td>
            <td>{player.STL}</td>
            <td>{player.BLK}</td>
            <td>{Math.round(player.RDEF*100)/100}</td>
            <td>{Math.round(player.PDEF*100)/100}</td>
            <td>{Math.round(player.DEF*100)/100}</td>
          </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Index;
