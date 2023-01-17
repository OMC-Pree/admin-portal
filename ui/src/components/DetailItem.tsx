import { Box, Grid, Typography } from "@mui/material";
import { lowerCase, upperFirst } from "lodash";
import { COLOURS } from "../theme/colours";
import { Link } from "react-router-dom";

interface DetailItemProps {
  prop: string;
  value: string | undefined;
  to?: string;
}

const DetailItem = ({ prop, value, to }: DetailItemProps) => (
  <Grid container rowSpacing={1}>
    <Grid item xs={6} sm={4}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {prop === "id" ? "ID" : upperFirst(lowerCase(prop))}
      </Typography>
    </Grid>
    <Grid item xs={6} sm={8} alignItems="baseline">
      {to ? (
        <Box component={Link} to={to} sx={{ textDecoration: "none" }}>
          <Typography variant="body1" sx={{ color: COLOURS.PINK[500] }}>
            {value}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
          {value}
        </Typography>
      )}
    </Grid>
  </Grid>
);

export default DetailItem;
