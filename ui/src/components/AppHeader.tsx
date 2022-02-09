import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";
import NavLink from "./NavLink";

function AppHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onNav = (dest: string) => () => navigate(dest);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ p: 2, borderBottom: "1px solid grey" }}
    >
      <Typography variant="h5" onClick={onNav("/")} sx={{ cursor: "pointer" }}>
        Admin Portal
      </Typography>
      {!user && location.pathname !== "/login" && <Button onClick={onNav("/login")}>Login</Button>}
      {user && (
        <>
          <Stack direction="row" alignItems="center" spacing={1}>
            <NavLink to="/coaches" title="all coaches" end />
            <Button onClick={logout}>Logout</Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default AppHeader;
