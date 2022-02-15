import { GetUsersResponse, IDPNewUser } from "../../../models/httpCalls";
import { MockRestHandler } from "../../types";
import { IUser } from "../../../features/user/user";
import { UserPermissions, UserType } from "../../../features/user/userEnums";

export const postUserBulkCreate: MockRestHandler = (req, res, ctx) => {
  const newUsers: IUser[] = (req.body as IDPNewUser[]).map((user, idx) => ({
    id: `new-user-${idx}`,
    type: UserType.CLIENT,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    airTableId: user.airTableId,
    emailVerified: false,
    password: `${idx}-password`,
    permissions: [UserPermissions.CLIENT],
    resetToken: "",
    resetTokenExpiry: "",
    planId: "",
    metadata: {},
    createdAt: "2022-02-15T10:45:34.383Z",
    updatedAt: "2022-02-15T10:45:34.383Z",
  }));
  const response: GetUsersResponse = {
    data: newUsers,
    meta: { count: newUsers.length, lastEvaluatedKey: newUsers[newUsers.length - 1].id },
    errors: [],
  };
  return res(ctx.status(200), ctx.json(response));
};
