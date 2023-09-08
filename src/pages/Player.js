import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Player() {
  const { playerId } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState([]);
  const [position, setPosition] = useState();
  const [team, setTeam] = useState();
  const [active, setActive] = useState();
  const [graphData, setGraphData] = useState();
  const isScreenWidthBelow600 = window.innerWidth < 600;
  const containerWidth = isScreenWidthBelow600 ? '950%' : '50%';



  const columns = [
    { field: "id", headerName: "Year", flex: 1 },
    { field: "player", headerName: "Player", flex: 1 },
    { field: "team", headerName: "Team", flex: 1 },
    { field: "gp", headerName: "GP", flex: 1 },
    { field: "min", headerName: "MIN", flex: 1 },
    { field: "pts", headerName: "PTS", flex: 1 },
    { field: "reb", headerName: "REB", flex: 1 },
    { field: "ast", headerName: "AST", flex: 1 },
    { field: "tov", headerName: "TOV", flex: 1 },
    { field: "stl", headerName: "STL", flex: 1 },
    { field: "blk", headerName: "BLK", flex: 1 },
    { field: "rdef", headerName: "RDEF", flex: 1 },
    { field: "pdef", headerName: "PDEF", flex: 1 },
    { field: "def", headerName: "RPDEF", flex: 1 },
  ];

  const seasonWithHighestDef = seasons.reduce((acc, curr) => {
    if (curr.def > acc.def) {
      return curr;
    } else {
      return acc;
    }
  }, {def: -Infinity}); 

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("https://rpdef-api.online/player?id=" + playerId);
      const json = await resp.json();
      const s = json[json.length-1];
      setSeason(s)
      setPosition(s.position);
      setTeam(s.team);
      setSeasons(json);
      
      const graph = json
        .filter(item => item.def > 0)
        .map(item => ({ id: item.id, RPDEF: item.def, RDEF: item.rdef, PDEF: item.pdef }));
    
      setGraphData(graph);
    };

    const getStatus = async () => {
      const resp = await fetch("https://rpdef-api.online/status?id=" + playerId);
      const json = await resp.json();
      setActive(json.active)
    };

    getData();
    getStatus();
  }, [playerId]);

  return (
    <div className="page-body">
      <div className="player-card">
        <div>
          <div className="player-name" style={{ fontSize: "250%", fontWeight: "bold" }}>{season.player}</div>
          <div
            style={{
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            • {position}, • {active ? team : "Retired"}
          </div>
          <div>
            <div className="stats-container">
              <div style={{ marginRight: "20px" }}>
                <div className="stat-category">PPG</div>
                <div className="stat-num">{active ? season.pts : seasonWithHighestDef.pts}</div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div className="stat-category">REB</div>
                <div className="stat-num">{active ? season.reb : seasonWithHighestDef.reb}</div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div className="stat-category">AST</div>
                <div className="stat-num">{active ? season.ast : seasonWithHighestDef.ast}</div>
              </div>
              <div>
                <div className="stat-category">DEF</div>
                <div className="stat-num">{active ? season.def : seasonWithHighestDef.def}</div>
              </div>
            </div>
            <div className="player-text" style={{width: '210px', textAlign: 'center', fontSize: '95%'}}>{active ? "2022-23 REGULAR SEASON" : seasonWithHighestDef.id + " - BEST DEFENSIVE SEASON"}</div>
          </div>
        </div>
        <div className="img-container">
          <div></div>
          <div className="img-div">
            <img
              src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png?imwidth=1040&imheight=760`}
              className="image"
              style={{ width: "300px", height: "219.23px" }}
              alt="headshot"
            />
          </div>
        </div>
      </div>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <DataGrid rows={seasons} columns={columns} autoHeight />
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        {(() => {
          try {
            const imageUrl = require("../assets/players-through-years/" + playerId + ".png");
            return <img src={imageUrl} className="player-years-img" alt="player graph" />;
          } catch (error) {
            return null;
          }
        })()}
      </div> */}
      <h3 className="graph-title" style={{marginTop: 50, textAlign: "center"}}>RPDEF of {season.player} through the years</h3>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <ResponsiveContainer width={containerWidth} height={400}>
        <LineChart className="line-chart" data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="RPDEF" stroke="#2975A9" />
          <Line type="monotone" dataKey="RDEF" stroke="#ED8429" />
          <Line type="monotone" dataKey="PDEF" stroke="#3A983A" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
        </LineChart>
        </ResponsiveContainer>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Player;