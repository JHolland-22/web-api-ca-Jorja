import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/home" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Latest", path: "/movies/latest" },
    { label: "Favorites", path: context.isAuthenticated ? "/movies/favorites" : "/login" },
    { label: "Watchlist", path: context.isAuthenticated ? "/movies/playlist" : "/login" },
    { label: "Actors", path: "/actors" },
    { label: "Sign in", path: "/login", hideWhenAuth: true },
    { label: "Sign up", path: "/signup", hideWhenAuth: true },
    { label: "Log out", path: "/", action: () => context.signout(), showWhenAuth: true },
  ];

  const handleMenuSelect = (opt) => {
    if (opt.action) {
      opt.action();
    } else {
      navigate(opt.path, { replace: true });
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#424242' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: 'white' }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            {context.isAuthenticated ? `Hi ${context.userName}, Welcome Back!` : ""}
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  (!opt.hideWhenAuth || !context.isAuthenticated) && (!opt.showWhenAuth || context.isAuthenticated) && (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt)}
                    >
                      {opt.label}
                    </MenuItem>
                  )
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                (!opt.hideWhenAuth || !context.isAuthenticated) && (!opt.showWhenAuth || context.isAuthenticated) && (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt)}
                    sx={{ color: 'white' }}
                  >
                    {opt.label}
                  </Button>
                )
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
