import { VerifyEmailRequest } from "../../models/httpCalls";
import { MockRestHandler } from "../types";

export const postUserEmailVerified: MockRestHandler = (req, res, ctx) => {
  const { token } = req.body as VerifyEmailRequest;
  if (!token || token === "invalid-token") return res(ctx.status(400));
  if (token === "500") return res(ctx.status(500));
  return res(ctx.status(204));
};
