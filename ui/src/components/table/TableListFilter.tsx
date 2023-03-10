import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Stack, TextField, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface TableListFilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  onKeyUp?: (key: string) => void;
}

const TableListFilter = ({ filter, setFilter, onKeyUp }: TableListFilterProps) => {
  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") setFilter("");
    if (typeof onKeyUp === "function") onKeyUp(e.key);
  }
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
      <TextField
        label="filter"
        value={filter}
        size="small"
        sx={{ flexGrow: 1 }}
        onKeyUp={handleKeyUp}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Tooltip title="Clear the list filter">
        <ClearIcon onClick={() => setFilter("")} sx={{ cursor: "pointer" }} />
      </Tooltip>
    </Stack>
  );
};

export default TableListFilter;
