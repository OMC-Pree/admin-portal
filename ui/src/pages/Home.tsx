import React from "react";
import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import useAuth from "../features/Auth/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <Stack>
      <Typography variant="h4">Home</Typography>
      {user && <NavLink to="/protected">Protected route</NavLink>}
    </Stack>
  );
};

export default Home;
