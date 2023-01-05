import { Typography } from "@mui/material";

import GoBack from "../components/GoBack";
import RequireAuth from "../features/auth/RequireAuth";
import CreateUserForm from "../features/user/createUsers/CreateUserForm";

function CreateUserPage() {
  return (
    <RequireAuth>
      <GoBack />
      <Typography variant="h4">Create new user</Typography>
      <CreateUserForm />
    </RequireAuth>
  );
}

export default CreateUserPage;
