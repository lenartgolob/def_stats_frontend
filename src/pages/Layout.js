import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const pages = ["Products", "Pricing", "Blog"];

function Layout() {
  const [players, setPlayers] = useState([]);
  const [playerSuggestions, setPlayerSuggestions] = useState([]);
  const [player, setPlayer] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const resp = await fetch("http://localhost:5000/players");
    const json = await resp.json();
    setPlayers(json.map((a) => a.Player));
  };

  const filterPlayers = function (e) {
    let results = players.filter((player) => {
      return player.toLowerCase().startsWith(e.query.toLowerCase());
    });
    setPlayerSuggestions(results);
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      navigate(`/player/${playerSuggestions}`);
    }
  }

  function navigateTo(path) {
    navigate(path);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="Seasons">
                  <Typography textAlign="center">Seasons</Typography>
                </MenuItem>
                <MenuItem key="Visualization">
                  <Typography textAlign="center">Visualization</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="Seasons"
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => { navigateTo("/seasons");}}
              >
                Seasons
              </Button>
              <Button
                key="Visualization"
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => { navigateTo("/visualization");}}
              >
                Visualization
              </Button>
            </Box>
            <Search>
              {/* <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              /> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={players}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                )}
              />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Layout;
