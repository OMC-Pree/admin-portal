import { Typography } from "@mui/material";

import GoBack from "../components/GoBack";
import RequireAuth from "../features/auth/RequireAuth";
import CreateOrganisationForm from "../features/organisations/createOrganisations/CreateOrganisationForm";

function CreateOrganisationPage() {
  return (
    <RequireAuth>
      <GoBack />
      <Typography variant="h4">Create new organisation</Typography>
      <CreateOrganisationForm />
    </RequireAuth>
  );
}

export default CreateOrganisationPage;
