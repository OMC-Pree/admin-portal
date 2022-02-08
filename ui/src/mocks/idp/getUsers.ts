// import { User } from "../../models/user;
import { IUser } from "../../models/user";
import { USERS_DATA } from "../data/users";
import { MockRestHandler } from "../types";
import { isAuthorised } from "./isAuthorised";

export const getUsers: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ errorMessage: "Invalid token" }));
  }

  let finalResults = [...USERS_DATA];
  req.url.searchParams.forEach((value: string, key: string) => {
    finalResults = finalResults.filter((client: IUser) => client[key as keyof IUser] === value);
  });
  return res(ctx.status(200), ctx.json({ data: finalResults, errors: [], meta: {} }));
};
