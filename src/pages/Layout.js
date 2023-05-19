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
import Footer from '../components/Footer';

function Layout() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    id: "",
    name: ""
  });
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSeasonsClicked, setIsSeasonsClicked] = useState(false);

  const getData = async () => {
    const resp = await fetch("https://rpdef-api.online/players");
    const json = await resp.json();
    setPlayers(json);
  };

  const handleInputChange = (event, value) => {
    setPlayer(value);
  };

  function handleCloseMenu() {
    setIsDrawerOpen(false);
    setIsSeasonsClicked(false);
  }

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
            <Typography
              className="rpdef"
              style={{ fontWeight: "bold" }}
              variant="h6"
            >
              RPDEF
            </Typography>
          </a>

          <Drawer open={isDrawerOpen} onClose={handleCloseMenu}>
            <List style={{ padding: "10px" }}>
              <a className="link-no-link home-link" href="/"><ListItem
                button
              >
                <ListItemText primary="Home" />
              </ListItem></a>
              <a className="link-no-link" href="/about"><ListItem button>
                <ListItemText primary="About" />
              </ListItem></a>
              <ListItem
                button
                onClick={() => setIsSeasonsClicked(!isSeasonsClicked)}
              >
                <ListItemText primary="Seasons" />
              </ListItem>
              {isSeasonsClicked && (
                <List sx={{ pl: 2 }}>
                  <a className="link-no-link" href="/season/22-23">
                    <ListItem button>
                      <ListItemText primary="22/23" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/21-22">
                    <ListItem button>
                      <ListItemText primary="21/22" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/20-21">
                    <ListItem button>
                      <ListItemText primary="20/21" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/19-20">
                    <ListItem button>
                      <ListItemText primary="19/20" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/18-19">
                    <ListItem button>
                      <ListItemText primary="18/19" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/17-18">
                    <ListItem button>
                      <ListItemText primary="17/18" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/16-17">
                    <ListItem button>
                      <ListItemText primary="16/17" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/15-16">
                    <ListItem button>
                      <ListItemText primary="15/16" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/14-15">
                    <ListItem button>
                      <ListItemText primary="14/15" />
                    </ListItem>
                  </a>
                  <a className="link-no-link" href="/season/13-14">
                    <ListItem button>
                      <ListItemText primary="13/14" />
                    </ListItem>
                  </a>
                </List>
              )}

            </List>
          </Drawer>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={players}
            getOptionLabel={(option) => option.Player}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate(`/player/${player.NbaPlayerId}`);
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
                    <a href={`/player/${player.NbaPlayerId}`}>
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
      <Footer />
    </>
  );
}

export default Layout;
