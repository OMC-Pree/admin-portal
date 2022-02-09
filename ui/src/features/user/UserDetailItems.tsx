import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { IUser } from "../user/user";
import { UserPermissions } from "../user/userEnums";
import { lowerCase, upperFirst } from "lodash";
import { format, parseISO } from "date-fns";
import { NavLink } from "react-router-dom";
import { COLOURS } from "../../theme/colours";
import useClient from "../clients/useClient";
import useCoach from "../coaches/useCoach";

interface IUserDetailItemProps {
  prop: string;
  value: string | undefined;
  to?: string;
}

const UserDetailItem = ({ prop, value, to }: IUserDetailItemProps) => (
  <Grid container>
    <Grid item xs={6}>
      <Typography variant="subtitle1">
        {prop === "id" ? "ID" : upperFirst(lowerCase(prop))}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      {to ? (
        <Box component={NavLink} to={to} sx={{ textDecoration: "none", color: COLOURS.PINK[500] }}>
          {value}
        </Box>
      ) : (
        <Typography variant="body1">{value}</Typography>
      )}
    </Grid>
  </Grid>
);

interface IUserDetailItemsProps {
  user: IUser;
}

const UserDetailItems = ({ user }: IUserDetailItemsProps) => {
  const { client: associate } = useClient(user.associateUserId);
  const { coach } = useCoach(user.coachUserID);

  const ret = [
    "firstName",
    "lastName",
    "email",
    "dateOfBirth",
    "id",
    "type",
    "permissions",
    "createdAt",
  ].map((key) => {
    const prop = key as keyof IUser;
    let value = user[prop];
    if (["dateOfBirth", "createdAt"].includes(prop)) {
      value = format(parseISO(value as string), "dd-MM-yyyy");
    } else if (prop === "permissions") {
      value = (value as UserPermissions[]).join(",");
    } else {
      value = value ? value?.toString() : "-";
    }
    return <UserDetailItem key={`user-detail-${prop}`} prop={prop} value={value} />;
  });

  if (coach)
    ret.push(
      <UserDetailItem
        key={`user-detail-assigned-coach`}
        prop="Assigned coach"
        value={`${coach.firstName} ${coach.lastName}`}
        to={`/coaches/${coach.id}`}
      />,
    );
  if (associate)
    ret.push(
      <UserDetailItem
        key={`user-detail-associated-user`}
        prop="Associated user"
        value={`${associate.firstName} ${associate.lastName}`}
        to={`/clients/${associate.id}`}
      />,
    );
  return <>{ret}</>;
};

export default UserDetailItems;
