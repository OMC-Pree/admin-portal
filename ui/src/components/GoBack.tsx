import React from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { COLOURS } from "../theme/colours";

function GoBack() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(-1)}
    >
      <ArrowLeft sx={{ color: COLOURS.PINK[500] }} />{" "}
      <Typography variant="body1" sx={{ color: COLOURS.PINK[500] }}>
        Go back
      </Typography>
    </Stack>
  );
}

export default GoBack;
