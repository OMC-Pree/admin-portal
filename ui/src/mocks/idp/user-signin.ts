import { UserPermissions } from "../../features/user/userEnums";
import { IUser } from "../../features/user/userModels";
import { LoginRequest } from "../../models/httpCalls";
import { TEST_2FA, TEST_PASSWORD } from "../constants";
import { MOCK_MANAGERS } from "../data/mockManagers";
import { MockRestHandler } from "../types";

/**
 * Implements v2 sign in logic
 * @param req
 * @param res
 * @param ctx
 * @returns
 */
export const userSignin2FA: MockRestHandler = (req, res, ctx) => {
  const { email, password, email2FACode } = req.body as LoginRequest;
  const userEmails = MOCK_MANAGERS.map((user) => user.email);
  const user: IUser | undefined = MOCK_MANAGERS.find((user) => user.email === email);
  const managerhAndAbovePermissions = [UserPermissions.ADMIN, UserPermissions.MANAGER];
  if (userEmails.includes(email) && password === TEST_PASSWORD) {
    // If no 2FA provided
    if (!email2FACode) {
      // If coach or above, send back 428 (if emailVerified or not)
      if (user?.permissions && managerhAndAbovePermissions.includes(user?.permissions[0])) {
        return res(ctx.status(428));
      } else {
        // For clients or enquirers
        return res(
          ctx.status(201),
          ctx.json({
            encryptedJWTToken: `token-for-${user?.id}`,
          }),
        );
      }
    } else {
      // If 2FA provided
      if (email2FACode === TEST_2FA) {
        return res(
          ctx.status(201),
          ctx.json({
            encryptedJWTToken: `token-for-${user?.id}`,
          }),
        );
      } else {
        return res(ctx.status(428), ctx.json({ errorMessage: "Incorrect or expired 2FA" }));
      }
    }
  }
  return res(ctx.status(401), ctx.json({ errorMessage: "Incorrect username or password" }));
};
