import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

function Layout() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getData = async () => {
    const resp = await fetch("http://localhost:5000/players");
    const json = await resp.json();
    setPlayers(json.map((a) => a.Player));
  };

  const handleInputChange = (event, value) => {
    console.log("lala");
    console.log(value);
    setPlayer(value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppBar
        variant="outlined"
        position="static"
        sx={{ backgroundColor: "#0B233F" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <a
            href="/"
            className="link-no-link home-btn"
            style={{ color: "white" }}
          >
            <Typography style={{fontWeight: 'bold'}} variant="h6">RPDEF</Typography>
          </a>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List>
              <a className="link-no-link" href="/seasons">
                <ListItem button>
                  <ListItemText primary="Seasons" />
                </ListItem>
              </a>
              <a className="link-no-link" href="/visualization">
                <ListItem button>
                  <ListItemText primary="Visualization" />
                </ListItem>
              </a>
            </List>
          </Drawer>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={players}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate(`/player/${player}`);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Search"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <a href={`/player/${player}`}>
                      <InputAdornment position="start">
                        {" "}
                        <SearchIcon />
                      </InputAdornment>
                    </a>
                  ),
                  disableUnderline: true,
                }}
              />
            )}
            className="autocomplete"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Layout;
