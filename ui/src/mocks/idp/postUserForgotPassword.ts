import { MockRestHandler } from "../types";

export const postUserForgotPassword: MockRestHandler = (req, res, ctx) => {
  return res(ctx.status(201));
};
