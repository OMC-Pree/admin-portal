import { Button, Grid, Input, InputLabel, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

interface ILocation {
  state: {
    from: {
      pathname: string;
    };
  };
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as ILocation;
  const { user, isFetchingUser, accessMessage, signin } = useAuth();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from);
  }, [user]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    signin({ email, password });
  }

  if (isFetchingUser) return null;

  return (
    <Stack alignItems="center" mt={10}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "fit-content" }}
        alignItems="center"
      >
        <TextField label="email" name="email" type="text" sx={{ width: 400 }} />
        <TextField label="password" name="password" type="password" sx={{ width: "100%" }} />
        <Button type="submit" variant="contained" sx={{ mt: 6, width: "fit-content" }}>
          Login
        </Button>
      </Stack>
      {accessMessage && (
        <Typography variant="body1" color="error" mt={3}>
          Access denied
        </Typography>
      )}
    </Stack>
  );
}

export default LoginPage;
