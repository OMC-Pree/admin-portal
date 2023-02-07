import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import LoginForm from "../features/auth/login/LoginForm";

function LoginPage() {
  const [need2faAuth, setNeed2faAuth] = useState<boolean>(false);
  const [incorrect2faAuth, setIncorrect2faAuth] = useState<boolean>(false);
  return (
    <Stack alignItems="center" mt={10}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: "24px" }}>
        {!need2faAuth
          ? "Sign in to your account"
          : !incorrect2faAuth
          ? "Enter your two-factor authentication code"
          : "Oops! That code is incorrect"}
      </Typography>
      <LoginForm
        setNeed2faAuth={setNeed2faAuth}
        need2faAuth={need2faAuth}
        setIncorrect2faAuth={setIncorrect2faAuth}
        incorrect2faAuth={incorrect2faAuth}
      />
    </Stack>
  );
}

export default LoginPage;
