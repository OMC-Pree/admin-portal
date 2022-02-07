import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../features/Auth/useAuth";

function AppHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  const goLogin = () => navigate("/login");
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ p: 2, borderBottom: "1px solid grey" }}
    >
      <Typography variant="h4" onClick={goHome} sx={{ cursor: "pointer" }}>
        Admin Portal
      </Typography>
      {!user && location.pathname !== "/login" && <Button onClick={goLogin}>Login</Button>}
      {user && <Button onClick={logout}>Logout</Button>}
    </Stack>
  );
}

export default AppHeader;
