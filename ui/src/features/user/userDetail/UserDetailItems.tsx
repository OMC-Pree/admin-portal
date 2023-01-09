import { Stack } from "@mui/material";
import { UserPermissions } from "../userEnums";
import { startCase, upperFirst } from "lodash";
import { format, parseISO } from "date-fns";
import { IUser } from "../userModels";
import UserDetailItem from "./UserDetailItem";
import { journeyStageList } from "../userConstants";

interface IUserDetailItemsProps {
  user: IUser;
  associate?: IUser;
  coach?: IUser;
}

const UserDetailItems = ({ user, associate, coach }: IUserDetailItemsProps) => {
  const detailItems = generateDetailItems(user);

  if (coach)
    detailItems.push(
      <UserDetailItem
        key={`user-detail-assigned-coach`}
        prop="Assigned coach"
        value={`${coach.firstName} ${coach.lastName}`}
        to={`/coaches/${coach.id}`}
      />,
    );
  if (associate)
    detailItems.push(
      <UserDetailItem
        key={`user-detail-associated-user`}
        prop="Associated user"
        value={`${associate.firstName} ${associate.lastName}`}
        to={`/clients/${associate.id}`}
      />,
    );
  return <Stack spacing={1}>{detailItems}</Stack>;
};

export default UserDetailItems;

////////////////////////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////////////////////////

function generateDetailItems(user: IUser) {
  const props: Array<keyof IUser> = [
    "firstName",
    "lastName",
    "email",
    "id",
    "type",
    "permissions",
    "journeyStage",
    "createdAt",
  ];
  return props.map((key) => (
    <UserDetailItem key={`user-detail-${key}`} prop={key} value={formatValue(user, key)} />
  ));
}

function formatValue(user: IUser, prop: keyof IUser) {
  let value = user[prop];
  if (value && ["dateOfBirth", "createdAt"].includes(prop)) {
    value = format(parseISO(value as string), "dd-MM-yyyy");
  } else if (prop === "permissions") {
    value = value || [];
    value = (value as UserPermissions[])
      .map((perm) => upperFirst(startCase(perm).toLowerCase()))
      .join(", ");
  } else if (prop === "type" && typeof value === "string") {
    value = upperFirst(value);
  } else if (prop === "journeyStage") {
    const matchingJourneyStageItem = journeyStageList.find(
      (journeyStageItem) => journeyStageItem.value === value,
    );
    value = matchingJourneyStageItem?.label || "-";
  } else {
    value = value ? value?.toString() : "-";
  }
  return value;
}
