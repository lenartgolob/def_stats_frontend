import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
// import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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

function Layout() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const resp = await fetch("http://localhost:5000/players");
    const json = await resp.json();
    setPlayers(json.map((a) => a.Player));
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  function handleCloseNavMenuNavigate(path) {
    setAnchorElNav(false);
    navigate(path);
  }

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
                onClick={handleOpenNavMenu}
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
                open={anchorElNav}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  key="Seasons"
                  onClick={() => {
                    handleCloseNavMenuNavigate("/seasons");
                  }}
                >
                  <Typography textAlign="center">Seasons</Typography>
                </MenuItem>
                <MenuItem
                  key="Visualization"
                  onClick={() => {
                    handleCloseNavMenuNavigate("/visualization");
                  }}
                >
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
                onClick={() => {
                  navigate("/seasons");
                }}
              >
                Seasons
              </Button>
              <Button
                key="Visualization"
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  navigate("/visualization");
                }}
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
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/player/${player}`);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search" />
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
