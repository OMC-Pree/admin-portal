import React from "react";
import { Breadcrumbs, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth";
import UserDetailPanel from "../features/user/UserDetailPanel";
import { COLOURS } from "../theme/colours";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import useDetailUser from "../features/user/useDetailUser";

function ClientDetailPage() {
  const { clientId } = useParams();
  const { detailUser: client, isFetching, refetch } = useDetailUser(clientId);
  const navigate = useNavigate();

  return (
    <RequireAuth>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Breadcrumbs sx={{ pb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ color: COLOURS.PINK[500], cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            <Typography sx={{ color: COLOURS.PINK[500] }}>Go back</Typography>
          </Stack>
          {client && (
            <Typography color="text.primary">
              {client.firstName} {client.lastName}
            </Typography>
          )}
        </Breadcrumbs>
        <Button variant="contained">Deactivate</Button>
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
              <UserDetailPanel user={client} onUserUpdated={refetch} />
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
