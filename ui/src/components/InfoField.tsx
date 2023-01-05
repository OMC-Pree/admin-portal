import { Typography, Grid } from "@mui/material";

const InfoField = ({
  label,
  answer,
}: {
  label: string;
  answer: string | undefined | null;
}): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>{`${label}: `}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">{`${
          answer !== "" && answer ? answer : "Not Provided"
        }`}</Typography>
      </Grid>
    </Grid>
  );
};

export default InfoField;
