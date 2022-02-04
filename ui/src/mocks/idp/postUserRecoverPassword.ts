import { RecoverPasswordRequest } from "../../models/httpCalls";
import { MockRestHandler } from "../types";

export const postUserRecoverPassword: MockRestHandler = (req, res, ctx) => {
  const { resetToken, newPassword } = req.body as RecoverPasswordRequest;
  if (!resetToken || !newPassword) {
    return res(
      ctx.status(400),
      ctx.json({
        data: [],
        meta: {},
        errors: ["missing field in request"],
      }),
    );
  }
  return res(ctx.status(201));
};
