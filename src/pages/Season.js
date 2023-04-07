import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@mui/material";

function Season() {
  const { year } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [topPlayer, setTopPlayer] = useState([]);

  const columns = [
    { field: "id", headerName: "Rank", width: 10 },
    {
      field: "player",
      headerName: "Player",
      width: 150,
      renderCell: (params) => (
        <Link href={`/player/${params.value}`} underline="none">
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
    { field: "def", headerName: "DEF", width: 20 },
  ];



  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        "http://localhost:5000/season?year=" + year.replace("-", "/")
      );
      const json = await resp.json();
      json.map((item, index) => {
        item.id = (index + 1).toString();
        return item;
      });
      setSeasons(json);
    };

    const getTopPlayer = async () => {
      const resp = await fetch(`http://localhost:5000/top/player?year=${year}`);
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
          <div
            style={{
              fontSize: "170%",
              fontWeight: "bold",
              marginTop: "50px",
              paddingRight: "20px",
            }}
          >
            <span style={{ textDecoration: "underline", fontSize: "120%" }}>
              {year}
            </span>
            : {topPlayer.player} has the best DEF score this season, with {topPlayer.rdef} RDEF and{" "}
            {topPlayer.pdef} PDEF, totalling to a {topPlayer.def} DEF.
          </div>
        </div>
        <div className="img-container">
          <div></div>
          <div style={{ width: "300px", height: "219.23px" }}>
            <img
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
