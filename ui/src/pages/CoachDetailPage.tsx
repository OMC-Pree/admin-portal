import { Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TableListFilter from "../components/Table/TableListFilter";
import RequireAuth from "../features/auth/RequireAuth";
import ClientList from "../features/clients/clientList/ClientList";
import NoClients from "../features/clients/clientList/NoClients";
import useCoachClients from "../features/clients/useCoachClients";

function CoachDetailPage() {
  const { coachId } = useParams();
  const { clients } = useCoachClients({ coachId });
  const [filter, setFilter] = useState<string>("");

  const filteredClients = filter
    ? clients.filter((client) => {
        const grouping = [client.firstName || "", client.lastName || "", client.email || ""];
        return !!grouping.find((str) => str.toLowerCase().includes(filter.toLowerCase()));
      })
    : clients;

  return (
    <RequireAuth>
      <Typography variant="h2">Coach Detail</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography>Stuff</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          {clients.length ? (
            <Stack spacing={2}>
              <Typography variant="h3">Assigned Clients</Typography>
              <Divider />
              <TableListFilter filter={filter} setFilter={setFilter} />
              <ClientList clients={filteredClients} />
            </Stack>
          ) : (
            <NoClients />
          )}
        </Grid>
      </Grid>
    </RequireAuth>
  );
}

export default CoachDetailPage;
