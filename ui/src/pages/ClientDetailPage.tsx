import { useState } from "react";
import { Box, Breadcrumbs, Grid, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth";
import UserDetailPanel from "../features/user/userDetail/UserDetailPanel";
import { COLOURS } from "../theme/colours";
import useDetailUser from "../features/user/userDetail/useDetailUser";
import UserNav from "../features/user/UserNav";
import { NavOptions } from "../features/user/UserNavEnums";
import UserAddress from "../features/user/userDetail/UserAddress";
import UserBankDetails from "../features/user/userDetail/UserBankDetails";
import UserTaxDetails from "../features/user/userDetail/UserTaxDetails";
import UserInvestments from "../features/user/userDetail/UserInvestments";

function ClientDetailPage() {
  const { clientId } = useParams();
  const { detailUser: client, isFetching, refetch } = useDetailUser(clientId);
  const [currentPage, setCurrentPage] = useState<NavOptions>(NavOptions.PERSONAL_INFO);

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
              <UserNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              {currentPage === NavOptions.PERSONAL_INFO && (
                <UserDetailPanel userId={clientId} onUserUpdated={refetch} />
              )}
              {currentPage === NavOptions.ADDRESS && <UserAddress client={client} />}
              {currentPage === NavOptions.BANK_DETAILS && <UserBankDetails client={client} />}
              {currentPage === NavOptions.TAX_INFO && <UserTaxDetails client={client} />}
              {currentPage === NavOptions.INVESTMENTS && <UserInvestments client={client} />}
            </Grid>
          </Grid>
        ) : null}
      </>
    </RequireAuth>
  );
}

export default ClientDetailPage;
