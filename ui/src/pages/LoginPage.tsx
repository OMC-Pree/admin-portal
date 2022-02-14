import React from "react";
import { Stack } from "@mui/material";
import LoginForm from "../features/auth_fix/LoginForm";

function LoginPage() {
  return (
    <Stack alignItems="center" mt={10}>
      <LoginForm />
    </Stack>
  );
}

export default LoginPage;
