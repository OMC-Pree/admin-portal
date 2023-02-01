import { useEffect, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { IUser } from "../userModels";
import UserDetailItems from "./UserDetailItems";
import EditUserForm from "../editUser/EditUserForm";
import {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useLazyGetUsersByCoachIdQuery,
} from "../../../api/users";

interface UserDetailPanelProps {
  userId: string;
  onUserUpdated?: () => void;
}

function UserDetailPanel({ userId, onUserUpdated }: UserDetailPanelProps) {
  const [coach, setCoach] = useState<IUser | undefined>();
  const [getUser] = useLazyGetUserByIdQuery();
  const [editing, setEditing] = useState(false);
  const [getUsersByCoachId] = useLazyGetUsersByCoachIdQuery();

  const { data: userData } = useGetUserByIdQuery(userId);
  const user = userData?.data[0];

  async function getCoachData(user: IUser | undefined) {
    if (user?.coachUserId) {
      const { data: coaches } = await getUser(user.coachUserId).unwrap();
      setCoach(coaches[0]);
    }
  }

  useEffect(() => {
    getCoachData(user);
  }, [user]);

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
        <UserDetailItems user={user} coach={coach} />
      )}
    </Stack>
  );
}

export default UserDetailPanel;
