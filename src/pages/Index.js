import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@mui/material";

function Index() {
  const [players, setPlayers] = useState([]);
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
    { field: "team", headerName: "Team", width: 80, flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "gp", headerName: "GP", flex: 1 },
    { field: "min", headerName: "MIN", flex: 1 },
    { field: "pts", headerName: "PTS", flex: 1 },
    { field: "reb", headerName: "REB", flex: 1 },
    { field: "ast", headerName: "AST", flex: 1 },
    { field: "tov", headerName: "TOV", flex: 1 },
    { field: "stl", headerName: "STL", flex: 1 },
    { field: "blk", headerName: "BLK", flex: 1 },
    { field: "rdef", headerName: "RDEF", flex: 1 },
    { field: "pdef", headerName: "PDEF", width: 80, flex: 1 },
    { field: "rpdef", headerName: "RPDEF", flex: 1 },
  ];
  
  const getData = async () => {
    const resp = await fetch("https://rpdef-api.online/top/players");
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
    setPlayers(modifiedJson);
  };

  const getTopPlayer = async () => {
    const resp = await fetch("https://rpdef-api.online/top/player?year=23-24");
    const json = await resp.json();
    setTopPlayer(json);
  };

  useEffect(() => {
    getData();
    getTopPlayer();
  }, []);

  return (
    <div className="page-body">
      <div className="player-card">
        <div>
          <div className="index-text">
            <span className="player-name" style={{ textDecoration: "underline" }}>
              {topPlayer.player}
            </span>{" "}
            has the best RPDEF score this season, with {topPlayer.rdef} RDEF and{" "}
            {topPlayer.pdef} PDEF, totalling to a {topPlayer.rpdef} RPDEF.
          </div>
        </div>
        <div className="img-container">
          <div></div>
          <div className="img-div" >
            <img
              src={topPlayer.image}
              className="image"
              style={{ width: "300px", height: "219.23px" }}
              alt="headshot"
            />
          </div>
        </div>
      </div>
      <div style={{ width: "90%", margin: "0 auto" }}>
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
