import { IUser } from "../../features/user/userModels";
import { UserPermissions, UserType } from "../../features/user/userEnums";

export const MOCK_CLIENTS: IUser[] = [
  {
    id: "dfd48ccb-ccfa-4fb2-a2e8-f80ee3c643a6",
    airTableId: "adamc-old-airtable-id",
    firstName: "Adam",
    lastName: "FirstClient",
    email: "adam@email.com",
    type: UserType.CLIENT,
    coachUserId: "7a59ebab-c39e-4f07-846d-a00212ec68b8",
    clientUserId: "",
    managerUserId: "",
    associateUserId: "5e465c0d-6dc9-47c6-af98-29126a332164",
    organisationIdentityId: "",
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
    qaClient: null,
  },
  {
    id: "217db1a5-d0f1-4cbe-ab61-3de935c302eb",
    airTableId: "bobc-old-airtable-id",
    firstName: "Bob",
    lastName: "SecondClient",
    email: "bob@email.com",
    type: UserType.CLIENT,
    coachUserId: "7a59ebab-c39e-4f07-846d-a00212ec68b8",
    clientUserId: "",
    managerUserId: "",
    associateUserId: "",
    organisationIdentityId: "",
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
    qaClient: null,
  },
  {
    id: "5e465c0d-6dc9-47c6-af98-29126a332164",
    airTableId: "assoc1-old-airtable-id",
    firstName: "Jonny",
    lastName: "FirstAssociate",
    email: "jassoc@email.com",
    type: UserType.CLIENT,
    coachUserId: "7a59ebab-c39e-4f07-846d-a00212ec68b8",
    clientUserId: "",
    managerUserId: "",
    associateUserId: "dfd48ccb-ccfa-4fb2-a2e8-f80ee3c643a6",
    organisationIdentityId: "",
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
    qaClient: null,
  },
  {
    id: "ee5d3662-a86a-48f0-86b6-e08a1e9633f0",
    airTableId: "",
    firstName: "Micky",
    lastName: "ThirdClient",
    email: "mclient@email.com",
    type: UserType.CLIENT,
    coachUserId: "0f132a73-842b-4494-abcd-5a88f41b5314",
    clientUserId: "",
    managerUserId: "",
    associateUserId: "",
    organisationIdentityId: "",
    planId: "",
    permissions: [UserPermissions.CLIENT],
    emailVerified: true,
    password: "",
    resetToken: "",
    resetTokenExpiry: "",
    title: "",
    pronoun: "",
    dateOfBirth: "1971-09-12",
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
    qaClient: null,
  },
];
