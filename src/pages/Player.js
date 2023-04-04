import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Player() {
  const { player } = useParams();
  const [seasons, setSeasons] = useState([]);

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
      setSeasons(json);
    };
  
    getData();
  }, [player]);
  

  return (
    <div>
      <h1>{player}</h1>
      <div style={{ height: 500, width: "95%" }}>
        <DataGrid rows={seasons} columns={columns} />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Player;
