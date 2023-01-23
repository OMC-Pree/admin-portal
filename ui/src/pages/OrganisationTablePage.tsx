import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import RequireAuth from "../features/auth/RequireAuth";
import TableListFilter from "../components/table/TableListFilter";
import OrganisationTable from "../features/organisations/OrganisationTable";
import useOrganisations from "../features/organisations/useOrganisations";
import { NavLink } from "react-router-dom";

function OrganisationTablePage() {
  const [filter, setFilter] = useState("");

  const organisationRowData = useOrganisations();

  const filteredOrganisationRowData = filter
    ? organisationRowData.filter((row) => {
        return row.name.toLowerCase().includes(filter.toLowerCase());
      })
    : organisationRowData;

  return (
    <RequireAuth>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "flex-start", md: "center" }}
        justifyContent={{ xs: "flex-start", md: "space-between" }}
        spacing={{ xs: 1, sm: 4 }}
        mb={2}
      >
        <Typography variant="h4">Organisations</Typography>
        <TableListFilter filter={filter} setFilter={setFilter} />
        <Stack direction="row" spacing={1}>
          <Box component={NavLink} to="/organisation/create" sx={{ textDecoration: "none" }}>
            <Button sx={{ width: 200 }} variant="contained">
              new organisation
            </Button>
          </Box>
        </Stack>
      </Stack>
      <OrganisationTable rows={filteredOrganisationRowData} />
    </RequireAuth>
  );
}

export default OrganisationTablePage;
