import React from "react";
import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth";
import useClient from "../features/clients/useClient";

function ClientDetailPage() {
  const { clientId } = useParams();
  const { client, isFetching } = useClient(clientId);
  return (
    <RequireAuth>
      <>
        <Typography variant="h3">Client detail</Typography>
        {isFetching ? (
          <Typography>Loading user</Typography>
        ) : client ? (
          <Stack>
            <Typography variant="h6">
              {client.firstName} {client.lastName}
            </Typography>
            <Typography variant="body1">ID: {client.id}</Typography>
          </Stack>
        ) : null}
      </>
    </RequireAuth>
  );
}

export default ClientDetailPage;
