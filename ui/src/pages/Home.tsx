import { Stack, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";

const Home = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/coaches" />;

  return (
    <Stack>
      <Typography variant="h4">Home</Typography>
    </Stack>
  );
};

export default Home;
