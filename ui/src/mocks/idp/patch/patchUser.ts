import { IUser } from "../../../features/user/user";
import { MOCK_USERS } from "../../data/mockUsers";
import { MockRestHandler } from "../../types";
import { isAuthorised } from "../isAuthorised";

export const patchUser: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ errorMessage: "Invalid token" }));
  }
  const { userId } = req.params;
  const userToPatch = MOCK_USERS.find((user) => user.id === userId);
  const newData = req.body as Partial<IUser>;
  return res(ctx.status(200), ctx.json({ ...userToPatch, ...newData }));
};
