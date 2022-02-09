import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { IUser } from "../user/user";
import UserDetailItems from "./UserDetailItems";

interface IUserDetailPanelProps {
  user: IUser;
}

function UserDetailPanel({ user }: IUserDetailPanelProps) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="h3" mb={1}>
          Personal information
        </Typography>
        <Button variant="contained" size="small">
          Edit
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={1}>
        <UserDetailItems user={user} />
      </Stack>
    </Stack>
  );
}

export default UserDetailPanel;
