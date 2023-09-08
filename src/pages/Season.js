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
    { field: "def", headerName: "RPDEF", flex: 1 },
  ];



  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        "https://rpdef-api.online/season?year=" + year.replace("-", "/")
      );
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
      const resp = await fetch(`https://rpdef-api.online/top/player?year=${year}`);
      const json = await resp.json();
      setTopPlayer(json);
    };

    getData();
    getTopPlayer();
  }, [year]);

  return (
    <div className="page-body">
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
      <div style={{ height: 700, width: "90%", margin: "0 auto" }}>
        <DataGrid rows={seasons} columns={columns} />
      </div>
      <div style={{ marginTop: 50 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img className="season-graph-img" src={require("../assets/scatter-plot/" + year + "-all.png")} alt="Scatter plot all" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
          <img className="season-graph-img" src={require("../assets/scatter-plot/" + year + "-guards.png")} alt="Scatter plot guards" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
          <img className="season-graph-img" src={require("../assets/scatter-plot/" + year + "-forwards.png")} alt="Scatter plot forwards" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
          <img className="season-graph-img" src={require("../assets/scatter-plot/" + year + "-centers.png")} alt="Scatter plot centers" />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Season;
