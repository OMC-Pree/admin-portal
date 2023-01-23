import { Stack, Breadcrumbs, Box, Typography, Divider, Grid } from "@mui/material";
import { format, parseISO } from "date-fns";

import { Link, useParams } from "react-router-dom";
import { useGetOrganisationByIdQuery } from "../api/organisationIdentity";

import RequireAuth from "../features/auth/RequireAuth";
import DetailItem from "../components/DetailItem";

import { COLOURS } from "../theme/colours";

const OrganisationDetailsPage = () => {
  const { organisationId } = useParams();
  const { data, isLoading } = useGetOrganisationByIdQuery({ id: organisationId });
  const organisation = data?.data[0];

  return (
    <RequireAuth>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Breadcrumbs sx={{ pb: 4 }}>
          <Box component={Link} to="/organisations" sx={{ color: COLOURS.PINK[500] }}>
            Organisations table
          </Box>
          {organisation && <Typography color="text.primary">{organisation.name}</Typography>}
        </Breadcrumbs>
      </Stack>
      <Grid container>
        <Grid xs={12} md={6} item={true}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Organisation details
          </Typography>

          <Divider sx={{ mb: 1 }} />

          {isLoading || !organisation ? (
            <h3>Loading</h3>
          ) : (
            <Stack spacing={1}>
              <DetailItem prop="Organisation ID" value={organisation.id} />
              <DetailItem prop="Organisation name" value={organisation.name} />
              <DetailItem
                prop="Created at"
                value={format(parseISO(organisation.createdAt), "dd/MM/yyyy")}
              />
              <DetailItem
                prop="Last updated at"
                value={format(parseISO(organisation.updatedAt), "dd/MM/yyyy")}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </RequireAuth>
  );
};

export default OrganisationDetailsPage;
