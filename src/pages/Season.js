import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@mui/material";

function Season() {
  const { year } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [topPlayer, setTopPlayer] = useState([]);
  const [playerIds, setPlayerIds] = useState({});

  const columns = [
    { field: "id", headerName: "Rank", width: 10 },
    {
      field: "player",
      headerName: "Player",
      width: 150,
      renderCell: (params) => (
        <Link href={`/player/${playerIds[params.value]}`} underline="none">
          {params.value}
        </Link>
      ),
    },
    { field: "team", headerName: "Team", width: 80 },
    { field: "position", headerName: "Position" },
    { field: "gp", headerName: "GP" },
    { field: "min", headerName: "MIN" },
    { field: "pts", headerName: "PTS" },
    { field: "reb", headerName: "REB" },
    { field: "ast", headerName: "AST" },
    { field: "tov", headerName: "TOV" },
    { field: "stl", headerName: "STL" },
    { field: "blk", headerName: "BLK" },
    { field: "rdef", headerName: "RDEF" },
    { field: "pdef", headerName: "PDEF", width: 80 },
    { field: "def", headerName: "RPDEF", width: 20 },
  ];



  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("http://46.101.99.4:5000/top/players");
      const json = await resp.json();
    
      const updatedPlayerIds = {};
    
      const modifiedJson = json.map((item, index) => {
        updatedPlayerIds[item.player] = item.NbaPlayerId;
        const { NbaPlayerId, ...rest } = item;
    
        const modifiedItem = {
          ...rest,
          id: (index + 1).toString(),
        };
    
        return modifiedItem;
      });
    
      setPlayerIds(updatedPlayerIds);
      setSeasons(modifiedJson);
    };

    const getTopPlayer = async () => {
      const resp = await fetch(`http://46.101.99.4:5000/top/player?year=${year}`);
      const json = await resp.json();
      setTopPlayer(json);
    };

    getData();
    getTopPlayer();
  }, [year]);

  return (
    <div>
      <div className="player-card">
        <div>
          <div className="index-text" >
            <span style={{ textDecoration: "underline", fontSize: "120%" }}>
              {year}
            </span>
            : {topPlayer.player} had the best RPDEF score this season, with {topPlayer.rdef} RDEF and{" "}
            {topPlayer.pdef} PDEF, totalling to a {topPlayer.def} DEF.
          </div>
        </div>
        <div className="img-container">
          <div></div>
          <div className="img-div">
            <img
              className="image"
              src={topPlayer.image}
              style={{ width: "300px", height: "219.23px" }}
              alt="headshot"
            />
          </div>
        </div>
      </div>
      <div style={{ height: 700, width: "95%", margin: "0 auto" }}>
        <DataGrid rows={seasons} columns={columns} />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Season;
