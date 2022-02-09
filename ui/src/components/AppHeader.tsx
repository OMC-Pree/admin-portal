import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";
import NavLink from "./NavLink";
import { COLOURS } from "../theme/colours";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import HeaderMenu from "./HeaderMenu";

const navHeight = 65;

function AppHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onNav = (dest: string) => () => navigate(dest);
  const onLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <Box sx={{ position: "relative", borderBottom: "1px solid grey", height: navHeight }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <Typography variant="h5" onClick={onNav("/")} sx={{ cursor: "pointer" }}>
          Admin Portal
        </Typography>
        {!user && location.pathname !== "/login" && (
          <Button onClick={onNav("/login")}>Login</Button>
        )}
        {user && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <NavLink to="/coaches" title="all coaches" end />
            <Button onClick={() => setMenuOpen(!menuOpen)}>
              {user.firstName} {user.lastName} {menuOpen ? <ArrowDropDown /> : <ArrowLeft />}
            </Button>
          </Stack>
        )}
      </Stack>
      {menuOpen && (
        <Box
          sx={{
            position: "absolute",
            width: "fit-content",
            minWidth: 200,
            bgcolor: COLOURS.WHITE,
            top: navHeight + 1,
            right: 0,
            border: "1px solid",
            borderWidth: "0 0 1px 1px",
            zIndex: 10,
          }}
        >
          <HeaderMenu onLogout={onLogout} onCloseMenu={() => setMenuOpen(false)} />
        </Box>
      )}
    </Box>
  );
}

export default AppHeader;
