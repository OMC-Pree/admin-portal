import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Breadcrumbs, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableListFilter from "../components/table/TableListFilter";
import RequireAuth from "../features/auth/RequireAuth";
import CustomerList from "../features/clients/clientList/CustomerList";
import NoCustomers from "../features/clients/clientList/NoCustomers";
import useCoachCustomers from "../features/clients/useCoachCustomers";
import useDetailUser from "../features/user/userDetail/useDetailUser";
import UserDetailPanel from "../features/user/userDetail/UserDetailPanel";
import { COLOURS } from "../theme/colours";
import { UserType } from "../features/user/userEnums";

enum TabValues {
  ALL = "all",
  CLIENTS = "clients",
  ENQUIRERS = "enquirers",
}

function CoachDetailPage() {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const { detailUser: coach, isFetching, refetch } = useDetailUser(coachId);
  const { customers, refetchCustomers } = useCoachCustomers(coach?.id);

  useEffect(() => {
    // Update customer list after a customer has been edited
    refetchCustomers();
  }, [customers]);

  const [filter, setFilter] = useState<string>("");
  const [tabValue, setTabValue] = useState(TabValues.ALL);

  if (!coachId) return null;

  const customersToDisplay = customers.filter((customer) => {
    if (tabValue === TabValues.ALL) return customer;
    if (tabValue === TabValues.CLIENTS) return customer.type === UserType.CLIENT;
    if (tabValue === TabValues.ENQUIRERS) return customer.type === UserType.ENQUIRER;
  });

  const filteredCustomers = filter
    ? customersToDisplay.filter((customer) => {
        const grouping = [
          customer.firstName || "",
          customer.lastName || "",
          customer.email || "",
          customer.id,
        ];
        return !!grouping.find((str) => str.toLowerCase().includes(filter.toLowerCase()));
      })
    : customersToDisplay;

  const onFilterKeyUp = (key: string) => {
    if (key === "Enter") {
      if (filteredCustomers.length === 1) navigate(`/clients/${filteredCustomers[0].id}`);
    }
  };

  const handleTabChange = (event: SyntheticEvent, value: TabValues) => {
    setTabValue(value);
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
                  Assigned Customers
                </Typography>
                <Divider />
                {customers.length ? (
                  <>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                      <Tab label="All" value={TabValues.ALL} />
                      <Tab label="Clients" value={TabValues.CLIENTS} />
                      <Tab label="Enquirers" value={TabValues.ENQUIRERS} />
                    </Tabs>
                    <TableListFilter
                      filter={filter}
                      setFilter={setFilter}
                      onKeyUp={onFilterKeyUp}
                    />
                    <CustomerList users={filteredCustomers} />
                  </>
                ) : (
                  <NoCustomers />
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
