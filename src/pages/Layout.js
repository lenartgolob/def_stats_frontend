import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AutoComplete } from 'primereact/autocomplete';


function Layout() {
  const [players, setPlayers] = useState([]);
  const [playerSuggestions, setPlayerSuggestions] = useState([]);
  const [player, setPlayer] = useState("");
  const [data, setData] = useState("");

  const getData = async () => {
    const resp = await fetch('http://localhost:5000/players');
    const json = await resp.json();
    setPlayers(json.map(a => a.Player));
    setData(json);
  }

  const filterPlayers = function(e) {
    let results = players.filter(player => {
      return player.toLowerCase().startsWith(e.query.toLowerCase());
    });
    setPlayerSuggestions(results);
  };

  useEffect(() => {
    getData();
  }, []);
  return(
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Index</Link>
          </li>
          <li>
            <Link to="/visualization">Visualization</Link>
          </li>
        </ul>
      </nav>
      <div>
        <AutoComplete value={player} suggestions={playerSuggestions} completeMethod={filterPlayers} onChange={e => setPlayer(e.target.value)}  />
        {/* <AutoComplete
          className="p-autocomplete"
          multiple={true}
          dropdown={true}
          value={player}
          suggestions={playerSuggestions}
          onChange={e => setPlayer(e.target.value)}
          completeMethod={filterPlayers}
        /> */}
      </div>
      <Outlet />
    </>
  );
}

export default Layout;