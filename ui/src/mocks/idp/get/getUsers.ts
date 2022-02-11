import { IUser } from "../../../features/user/user";
import { MOCK_USERS } from "../../data/mockUsers";
import { MockRestHandler } from "../../types";
import { isAuthorised } from "../isAuthorised";

export const getUsers: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ errorMessage: "Invalid token" }));
  }
  const type = req.url.searchParams.get("type");
  const id = req.url.searchParams.get("id");
  const coachId = req.url.searchParams.get("coachUserID");

  let finalResults: IUser[] = [];
  if (id) {
    const found = MOCK_USERS.find((u) => u.id === id);
    if (found) finalResults = [found];
  } else {
    if (type) finalResults = MOCK_USERS.filter((u) => u.type === type);
    if (coachId) finalResults = finalResults.filter((u) => u.coachUserId === coachId);
  }

  return res(ctx.status(200), ctx.json({ data: finalResults, errors: [], meta: {} }));
};
