import { MockRestHandler } from "../types";
import { isAuthorised } from "./isAuthorised";

export const postUserChangePassword: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ data: [], meta: {}, errors: ["unauthorized"] }));
  }
  return res(ctx.status(204));
};
