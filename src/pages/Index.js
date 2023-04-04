import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Index() {

  const [players, setPlayers] = useState([]);

  const columns = [
    { field: "id", headerName: "Rank" },
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

  const getData = async () => {
    const resp = await fetch('http://localhost:5000/top/players');
    const json = await resp.json();
    json.map((item, index) => {
      item.id = (index+1).toString();
      return item;
    });
    setPlayers(json);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Best defenders of 22/23</h1>
      <div style={{ width: "95%" }}>
        <DataGrid rows={players} columns={columns} autoHeight />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Index;
