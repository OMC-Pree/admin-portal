import React from "react";
import { Stack, TextField, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ICoachListFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

const CoachListFilter = ({ filter, setFilter }: ICoachListFilterProps) => (
  <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
    <TextField
      label="filter"
      value={filter}
      size="small"
      sx={{ flexGrow: 1 }}
      onKeyUp={(e) => {
        if (e.key === "Escape") setFilter("");
      }}
      onChange={(e) => setFilter(e.target.value)}
    />
    <Tooltip title="clear the list filter">
      <ClearIcon onClick={() => setFilter("")} sx={{ cursor: "pointer" }} />
    </Tooltip>
  </Stack>
);

export default CoachListFilter;
