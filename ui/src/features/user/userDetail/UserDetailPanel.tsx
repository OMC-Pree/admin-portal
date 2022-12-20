import React, { useEffect, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { IUser } from "../userModels";
import UserDetailItems from "./UserDetailItems";
import EditUserForm from "../editUser/EditUserForm";
import { useLazyGetUserByIdQuery, useLazyGetUsersByCoachIdQuery } from "../../../api/users";

interface IUserDetailPanelProps {
  userId: string;
  onUserUpdated?: () => void;
}

function UserDetailPanel({ userId, onUserUpdated }: IUserDetailPanelProps) {
  const [user, setUser] = useState<IUser | undefined>();
  const [associate, setAssociate] = useState<IUser | undefined>();
  const [coach, setCoach] = useState<IUser | undefined>();
  const [getUser] = useLazyGetUserByIdQuery();
  const [editing, setEditing] = useState(false);

  const [getUsersByCoachId] = useLazyGetUsersByCoachIdQuery();

  async function loadUsers(_userId: string) {
    const { data: userResponse } = await getUser(_userId).unwrap();
    const user = userResponse[0];
    setUser(user);
    if (user.associateUserId) {
      const { data: associates } = await getUser(user.associateUserId).unwrap();
      setAssociate(associates[0]);
    }
    if (user.coachUserId) {
      const { data: coaches } = await getUser(user.coachUserId).unwrap();
      setCoach(coaches[0]);
    }
  }

  useEffect(() => {
    loadUsers(userId);
    return () => {
      setUser(undefined);
      setAssociate(undefined);
      setCoach(undefined);
    };
  }, [userId]);

  if (!user) return null;

  return (
    <Stack spacing={2} data-testid="user-detail-panel">
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
            getUsersByCoachId({ coachId: coach?.id });
            if (typeof onUserUpdated === "function") onUserUpdated();
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <UserDetailItems user={user} associate={associate} coach={coach} />
      )}
    </Stack>
  );
}

export default UserDetailPanel;
