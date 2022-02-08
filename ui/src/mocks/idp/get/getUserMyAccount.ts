import { MOCK_USERS } from "../../data/mockUsers";
import { MockRestHandler } from "../../types";
import { isAuthorised } from "../isAuthorised";

export const getUserMyAccount: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ errorMessage: "Invalid token" }));
  }
  const id = req.headers.get("authorization")?.split(" ").pop()?.replace("token-for-", "");
  const user = MOCK_USERS.find((user) => user.id === id);
  return res(ctx.status(200), ctx.json({ data: [user] }));
};
