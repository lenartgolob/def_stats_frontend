import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@mui/material";
import ScatterPlot from '../components/ScatterPlot';
import FilterOptions from '../components/FilterOptions';

function Season() {
  const { year } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [topPlayer, setTopPlayer] = useState([]);
  const [playerIds, setPlayerIds] = useState({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    all: true,
    guards: false,
    forwards: false,
    centers: false,
  });
  const scatterPlotRef = useRef();

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
      setData(json);
    };

    const getTopPlayer = async () => {
      const resp = await fetch(`https://rpdef-api.online/top/player?year=${year}`);
      const json = await resp.json();
      setTopPlayer(json);
    };

    getData();
    getTopPlayer();
  }, [year]);

  const handleFilterChange = (filterType) => {
    setFilters((prevFilters) => {
      console.log(prevFilters)
      // If the selected filter is already true, reset all filters to true (selecting "All")
      if (prevFilters[filterType]) {
        return { all: true, guards: false, forwards: false, centers: false };
      }

      // Otherwise, set the selected filter to true and reset others to false
      return {
        all: filterType === 'all',
        guards: filterType === 'guards',
        forwards: filterType === 'forwards',
        centers: filterType === 'centers',
      };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      let newFilteredData;
    
      if (filters.all || (!filters.guards && !filters.forwards && !filters.centers)) {
        // If "All" is selected or no specific filter is selected, use the original dataset
        newFilteredData = data;
      } else {
        // Apply filters based on the selected positions
        newFilteredData = data.filter((player) => {
          if (filters.guards && player.position.includes('G')) {
            return true;
          }
          if (filters.forwards && player.position.includes('F')) {
            return true;
          }
          if (filters.centers && player.position.includes('C')) {
            return true;
          }
          return false;
        });
      }
    
      setFilteredData(newFilteredData);
    };

    applyFilters();
  }, [data, filters]);

  useEffect(() => {
    // Check if the ScatterPlot content overflows horizontally
    const isOverflowing = scatterPlotRef.current.scrollWidth > scatterPlotRef.current.clientWidth;

    // Apply styles based on the overflow condition
    scatterPlotRef.current.style.overflowX = isOverflowing ? 'scroll' : 'hidden';
  }, [filteredData]);
  

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
      <div style={{ textAlign: 'center', marginTop: 100}}>
        <p style={{fontSize: '120%', fontWeight: 'bold'}}>Where every player in the NBA stands, according to RPDEF</p>
        <p>Defensive ratings for NBA players. Filter by positions to find players.</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div ref={scatterPlotRef} style={{ textAlign: 'center' }}>
        <ScatterPlot data={filteredData} />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Season;
