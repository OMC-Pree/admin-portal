import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import RequireAuth from "../features/auth/RequireAuth";
import useCoaches from "../features/coaches/useCoaches";
import CoachList from "../features/coaches/coachList/CoachList";
import TableListFilter from "../components/table/TableListFilter";
import { NavLink, useNavigate } from "react-router-dom";

function CoachListPage() {
  const navigate = useNavigate();
  const { coaches } = useCoaches();
  const [filter, setFilter] = useState("");

  const filteredCoaches = filter
    ? coaches.filter((coach) => {
        const grouping = [coach.firstName || "", coach.lastName || "", coach.email || "", coach.id];
        return !!grouping.find((str) => str.toLowerCase().includes(filter.toLowerCase()));
      })
    : coaches;

  const onFilterKeyUp = (key: string) => {
    if (key === "Enter") {
      if (filteredCoaches.length === 1) navigate(`/coaches/${filteredCoaches[0].id}`);
    }
  };

  return (
    <RequireAuth>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "flex-start", md: "center" }}
        justifyContent={{ xs: "flex-start", md: "space-between" }}
        spacing={{ xs: 1, sm: 4 }}
        mb={2}
      >
        <Typography variant="h4">Coach list</Typography>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems={{ xs: "center", sm: "flex-end", md: "center" }}
          spacing={{ xs: 1, md: 4 }}
          sx={{ flexGrow: 1 }}
        >
          <TableListFilter filter={filter} setFilter={setFilter} onKeyUp={onFilterKeyUp} />
          <Stack direction="row" spacing={1}>
            <Box component={NavLink} to="/user/create" sx={{ textDecoration: "none" }}>
              <Button sx={{ width: 150 }} variant="contained">
                new user
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <CoachList coaches={filteredCoaches} />
    </RequireAuth>
  );
}

export default CoachListPage;
