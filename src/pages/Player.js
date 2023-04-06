import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Player() {
  const { player } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState([]);
  const [image, setImage] = useState();
  const [position, setPosition] = useState();
  const [team, setTeam] = useState();


  const columns = [
    { field: "id", headerName: "Year" },
    { field: "player", headerName: "Player" },
    { field: "team", headerName: "Team" },
    { field: "gp", headerName: "GP" },
    { field: "min", headerName: "MIN" },
    { field: "pts", headerName: "PTS" },
    { field: "reb", headerName: "REB" },
    { field: "ast", headerName: "AST" },
    { field: "tov", headerName: "TOV" },
    { field: "stl", headerName: "STL" },
    { field: "blk", headerName: "BLK" },
    { field: "rdef", headerName: "RDEF" },
    { field: "pdef", headerName: "PDEF" },
    { field: "def", headerName: "DEF" },
  ];

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("http://localhost:5000/player?name=" + player);
      const json = await resp.json();
      const s = json[json.length-1];
      setSeason(s)
      setPosition(s.position);
      setTeam(s.team);
      setSeasons(json);
    };

    const getImage = async () => {
      const resp = await fetch("http://localhost:5000/image?name=" + player);
      const json = await resp.json();
      setImage(json.link);
    };

    getData();
    getImage();
  }, [player]);

  return (
    <div>
      <div className="player-card">
        <div>
          <div style={{ fontSize: "250%", fontWeight: "bold" }}>{player}</div>
          <div
            style={{
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            • {position}, • {team}
          </div>
          <div>
            <div className="stats-container">
              <div style={{ marginRight: "20px" }}>
                <div className="stat-category">PPG</div>
                <div className="stat-num">{season.pts}</div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div className="stat-category">REB</div>
                <div className="stat-num">{season.reb}</div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <div className="stat-category">AST</div>
                <div className="stat-num">{season.ast}</div>
              </div>
              <div>
                <div className="stat-category">DEF</div>
                <div className="stat-num">{season.def}</div>
              </div>
            </div>
            <div style={{width: '245px', textAlign: 'center'}}>2022-23 REGULAR SEASON</div>
          </div>
        </div>
        <div className="img-container">
          <div></div>
          <div style={{ width: "300px", height: "219.23px" }}>
            <img
              src={image}
              style={{ width: "300px", height: "219.23px" }}
              alt="headshot"
            />
          </div>
        </div>
      </div>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <DataGrid rows={seasons} columns={columns} autoHeight />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Player;
