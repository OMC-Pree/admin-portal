import { IUser, UserPermissions, UserType } from "../../models/user";

export const MOCK_CLIENTS: IUser[] = [
  {
    id: "dfd48ccb-ccfa-4fb2-a2e8-f80ee3c643a6",
    airTableId: "adamc-old-airtable-id",
    firstName: "Adam",
    lastName: "Client",
    email: "adam@email.com",
    type: UserType.CLIENT,
    coachUserID: "7a59ebab-c39e-4f07-846d-a00212ec68b8",
    clientUserID: "",
    managerUserID: "",
    planId: "25069684-5387-11ec-b4fc-e7b75b8859d7",
    permissions: [UserPermissions.CLIENT],
    emailVerified: true,
    password: "",
    resetToken: "",
    resetTokenExpiry: "",
    title: "",
    pronoun: "",
    dateOfBirth: "1977-05-23",
    phones: [
      {
        type: "Home",
        prefix: "+44",
        number: "01234567890",
      },
    ],
    addresses: [],
    metadata: {},
    createdAt: "2021-10-23T16:23:42.138Z",
    updatedAt: "2022-02-08T11:39:35.210Z",
  },
  {
    id: "217db1a5-d0f1-4cbe-ab61-3de935c302eb",
    airTableId: "bobc-old-airtable-id",
    firstName: "Bob",
    lastName: "Client",
    email: "bob@email.com",
    type: UserType.CLIENT,
    coachUserID: "7a59ebab-c39e-4f07-846d-a00212ec68b8",
    clientUserID: "",
    managerUserID: "",
    planId: "",
    permissions: [UserPermissions.CLIENT],
    emailVerified: true,
    password: "",
    resetToken: "",
    resetTokenExpiry: "",
    title: "",
    pronoun: "",
    dateOfBirth: "1988-09-12",
    phones: [
      {
        type: "Home",
        prefix: "+44",
        number: "01234567890",
      },
    ],
    addresses: [],
    metadata: {},
    createdAt: "2021-07-02T10:12:42.138Z",
    updatedAt: "2022-02-08T11:39:35.210Z",
  },
];
