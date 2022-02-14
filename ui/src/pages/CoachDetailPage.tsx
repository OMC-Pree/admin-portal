import React, { useState } from "react";
import { Box, Breadcrumbs, Divider, Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableListFilter from "../components/table_fix/TableListFilter";
import RequireAuth from "../features/auth/RequireAuth";
import ClientList from "../features/clients/clientList/ClientList";
import NoClients from "../features/clients/clientList/NoClients";
import useCoachClients from "../features/clients/useCoachClients";
import useDetailUser from "../features/user/userDetail/useDetailUser";
import UserDetailPanel from "../features/user/userDetail/UserDetailPanel";
import { COLOURS } from "../theme/colours";

function CoachDetailPage() {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const { detailUser: coach, isFetching, refetch } = useDetailUser(coachId);
  const { clients } = useCoachClients({ coachId: coach?.id });
  const [filter, setFilter] = useState<string>("");

  if (!coachId) return null;

  const filteredClients = filter
    ? clients.filter((client) => {
        const grouping = [
          client.firstName || "",
          client.lastName || "",
          client.email || "",
          client.id,
        ];
        return !!grouping.find((str) => str.toLowerCase().includes(filter.toLowerCase()));
      })
    : clients;

  const onFilterKeyUp = (key: string) => {
    if (key === "Enter") {
      if (filteredClients.length === 1) navigate(`/clients/${filteredClients[0].id}`);
    }
  };

  return (
    <RequireAuth>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Breadcrumbs sx={{ pb: 4 }}>
          <Box component={Link} to="/coaches" sx={{ color: COLOURS.PINK[500] }}>
            Coaches List
          </Box>
          {coach && (
            <Typography color="text.primary">
              {coach.firstName} {coach.lastName}
            </Typography>
          )}
        </Breadcrumbs>
      </Stack>
      <>
        {isFetching ? (
          <Typography>Loading coach user data</Typography>
        ) : coach ? (
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ pr: { md: 2 }, borderRight: { md: `1px dashed ${COLOURS.GREY[300]}` } }}
            >
              <UserDetailPanel userId={coachId} onUserUpdated={refetch} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <Typography variant="h3" mb={1}>
                  Assigned Clients
                </Typography>
                <Divider />
                {clients.length ? (
                  <>
                    <TableListFilter
                      filter={filter}
                      setFilter={setFilter}
                      onKeyUp={onFilterKeyUp}
                    />
                    <ClientList clients={filteredClients} />
                  </>
                ) : (
                  <NoClients />
                )}
              </Stack>
            </Grid>
          </Grid>
        ) : null}
      </>
    </RequireAuth>
  );
}

export default CoachDetailPage;
