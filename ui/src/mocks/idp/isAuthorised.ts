import { RestRequest } from "msw";
import { USERS_DATA } from "../data/users";

export const isAuthorised = (req: RestRequest): boolean => {
  const tokens = USERS_DATA.map((user) => `Bearer token-for-${user.id}`);
  const token = req.headers.get("authorization") || "";
  return tokens.includes(token);
};
