import React from "react";
import { Box, Breadcrumbs, Grid, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth";
import UserDetailPanel from "../features/user/userDetail/UserDetailPanel";
import { COLOURS } from "../theme/colours";
import useDetailUser from "../features/user/userDetail/useDetailUser";

function ClientDetailPage() {
  const { clientId } = useParams();
  const { detailUser: client, isFetching, refetch } = useDetailUser(clientId);

  if (!client || !clientId) return null;

  return (
    <RequireAuth>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Breadcrumbs sx={{ pb: 4 }}>
          <Box
            component={Link}
            to={`/coaches/${client.coachUserId}`}
            sx={{ textDecoration: "none" }}
          >
            <Typography variant="body1" sx={{ color: COLOURS.PINK[500] }}>
              Go to coach
            </Typography>
          </Box>
          {client && (
            <Typography variant="body1" color="text.primary">
              {client.firstName} {client.lastName}
            </Typography>
          )}
        </Breadcrumbs>
      </Stack>
      <>
        {isFetching ? (
          <Typography>Loading user</Typography>
        ) : client ? (
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ pr: { md: 2 }, borderRight: { md: `1px dashed ${COLOURS.GREY[300]}` } }}
            >
              <UserDetailPanel userId={clientId} onUserUpdated={refetch} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Stack spacing={2}>
                <Typography variant="h3" mb={1}>
                  Client portal data
                </Typography>
                <Divider />
              </Stack> */}
            </Grid>
          </Grid>
        ) : null}
      </>
    </RequireAuth>
  );
}

export default ClientDetailPage;
