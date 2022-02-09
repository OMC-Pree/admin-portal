import { IUser } from "../../features/user/user";
import { UserPermissions, UserType } from "../../features/user/userEnums";

export const MOCK_MANAGERS: IUser[] = [
  {
    id: "15353648-549c-4ab9-89d3-75de25d5743d",
    airTableId: "c1-old-airtable-id",
    type: UserType.MANAGER,
    managerUserID: "",
    coachUserID: "",
    clientUserID: "",
    associateUserId: "",
    planId: "",
    permissions: [UserPermissions.MANAGER],
    email: "manager1@email.com",
    emailVerified: true,
    password: "",
    resetToken: "",
    resetTokenExpiry: "",
    firstName: "Manager",
    lastName: "One",
    title: "",
    pronoun: "",
    dateOfBirth: "",
    phones: [],
    addresses: [],
    metadata: {},
    createdAt: "2021-10-23T16:23:42.138Z",
    updatedAt: "2022-02-08T11:39:35.210Z",
  },
];
