import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate, useLocation } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, userName, logout } = useContext(AuthContext);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top_rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
    { label: "Search", path: "/movies/search" },
    { label: "Actors", path: "/movies/actors" },

    // Only shown when logged in:
    ...(isAuthenticated
      ? [
          { label: "Favorites", path: "/movies/favorites" },
          { label: "Must Watch", path: "/movies/mustwatch" },
        ]
      : [])
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundImage:
            "linear-gradient(90deg, rgba(124,58,237,0.9) 0%, rgba(34,211,238,0.9) 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              NeonFlix
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Explore. Discover. Watch.
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    selected={location.pathname === opt.path}
                  >
                    {opt.label}
                  </MenuItem>
                ))}

                {!isAuthenticated && (
                  <>
                    <MenuItem onClick={() => handleMenuSelect("/login")}>Login</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/signup")}>Sign up</MenuItem>
                  </>
                )}

                {isAuthenticated && (
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleMenuSelect("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => {
                const active = location.pathname === opt.path;
                return (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    variant={active ? "contained" : "text"}
                    sx={{
                      mx: 0.5,
                      bgcolor: active ? "rgba(255,255,255,0.15)" : "transparent",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                      borderRadius: 10,
                    }}
                  >
                    {opt.label}
                  </Button>
                );
              })}

              <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 2 }}>
                {!isAuthenticated && (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate("/login")}
                      sx={{
                        mx: 0.5,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                        borderRadius: 10,
                      }}
                    >
                      Login
                    </Button>

                    <Button
                      color="inherit"
                      onClick={() => navigate("/signup")}
                      sx={{
                        mx: 0.5,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                        borderRadius: 10,
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}

                {isAuthenticated && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Signed in as {userName}
                    </Typography>

                    <Button
                      color="inherit"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      sx={{
                        mx: 0.5,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                        borderRadius: 10,
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;

