import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Player() {
  const { player } = useParams();
  const [seasons, setSeasons] = useState([]);

  const getData = async () => {
    const resp = await fetch("http://localhost:5000/player?name=" + player);
    const json = await resp.json();
    setSeasons(json);
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <h1>{player}</h1>
      <table>
        <tr>
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
        {seasons.map((season, index) => {
          return (
            <tr key={index}>
              <td>{season.Team}</td>
              <td>{season.GP}</td>
              <td>{season.MIN}</td>
              <td>{season.PTS}</td>
              <td>{season.REB}</td>
              <td>{season.AST}</td>
              <td>{season.TOV}</td>
              <td>{season.STL}</td>
              <td>{season.BLK}</td>
              <td>{Math.round(season.RDEF * 100) / 100}</td>
              <td>{Math.round(season.PDEF * 100) / 100}</td>
              <td>{Math.round(season.DEF * 100) / 100}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Player;
