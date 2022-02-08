import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import RequireAuth from "../features/auth/RequireAuth";
import useCoaches from "../features/coaches/useCoaches";
import CoachList from "../features/coaches/coachList/CoachList";
import TableListFilter from "../components/Table/TableListFilter";

function CoachListPage() {
  const { coaches } = useCoaches();
  const [filter, setFilter] = useState<string>("");

  const filteredCoaches = filter
    ? coaches.filter((coach) => {
        const grouping = [coach.firstName || "", coach.lastName || "", coach.email || ""];
        return !!grouping.find((str) => str.toLowerCase().includes(filter.toLowerCase()));
      })
    : coaches;

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
          <TableListFilter filter={filter} setFilter={setFilter} />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" sx={{ width: 150 }}>
              New user
            </Button>
            <Button variant="contained" sx={{ width: 150 }}>
              Bulk create
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <CoachList coaches={filteredCoaches} />
    </RequireAuth>
  );
}

export default CoachListPage;
