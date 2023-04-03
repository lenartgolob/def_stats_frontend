import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AutoComplete } from 'primereact/autocomplete';
import { useNavigate } from 'react-router-dom';


function Layout() {
  const [players, setPlayers] = useState([]);
  const [playerSuggestions, setPlayerSuggestions] = useState([]);
  const [player, setPlayer] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const resp = await fetch('http://localhost:5000/players');
    const json = await resp.json();
    setPlayers(json.map(a => a.Player));
  }

  const filterPlayers = function(e) {
    let results = players.filter(player => {
      return player.toLowerCase().startsWith(e.query.toLowerCase());
    });
    setPlayerSuggestions(results);
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      navigate(`/player/${playerSuggestions}`);
      window.location.reload();
    }
  }

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
        <AutoComplete value={player} suggestions={playerSuggestions} completeMethod={filterPlayers} onChange={e => setPlayer(e.target.value)} onKeyPress={handleKeyPress}  />
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