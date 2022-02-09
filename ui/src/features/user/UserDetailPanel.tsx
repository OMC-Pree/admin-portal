import React, { useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { IUser } from "../user/user";
import UserDetailItems from "./UserDetailItems";
import EditUserForm from "./EditUserForm";

interface IUserDetailPanelProps {
  user: IUser;
  onUserUpdated?: () => void;
}

function UserDetailPanel({ user, onUserUpdated }: IUserDetailPanelProps) {
  const [editing, setEditing] = useState(false);
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="h3" mb={1}>
          Personal information
        </Typography>
        {!editing && (
          <Button variant="contained" size="small" onClick={() => setEditing(true)}>
            EDIT
          </Button>
        )}
      </Stack>
      <Divider />
      {editing ? (
        <EditUserForm
          user={user}
          onSuccess={() => {
            setEditing(false);
            if (typeof onUserUpdated === "function") onUserUpdated();
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <UserDetailItems user={user} />
      )}
    </Stack>
  );
}

export default UserDetailPanel;
