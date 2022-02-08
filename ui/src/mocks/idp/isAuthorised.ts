import { RestRequest } from "msw";
import { MOCK_USERS } from "../data/mockUsers";

export const isAuthorised = (req: RestRequest): boolean => {
  const tokens = MOCK_USERS.map((user) => `Bearer token-for-${user.id}`);
  const token = req.headers.get("authorization") || "";
  return tokens.includes(token);
};
