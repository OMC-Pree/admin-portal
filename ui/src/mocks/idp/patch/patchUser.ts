import { IUser } from "../../../features/user/user";
import { UserType } from "../../../features/user/userEnums";
import { MOCK_CLIENTS } from "../../data/mockClients";
import { MOCK_COACHES } from "../../data/mockCoaches";
import { MOCK_MANAGERS } from "../../data/mockManagers";
import { MOCK_USERS } from "../../data/mockUsers";
import { MockRestHandler } from "../../types";
import { isAuthorised } from "../isAuthorised";

export const patchUser: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ errorMessage: "Invalid token" }));
  }
  const { userId } = req.params;
  const newData = req.body as Partial<IUser>;
  let userToPatch = MOCK_USERS.find((user) => user.id === userId);
  if (!userToPatch) {
    userToPatch =
      newData.type === UserType.MANAGER
        ? MOCK_MANAGERS[0]
        : newData.type === UserType.COACH
        ? MOCK_COACHES[0]
        : MOCK_CLIENTS[0];
  }
  return res(ctx.status(200), ctx.json({ data: [{ ...userToPatch, ...newData }] }));
};
