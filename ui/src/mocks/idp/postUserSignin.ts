import { LoginRequest } from "../../models/httpCalls";
import { USERS_DATA } from "../data/users";
import { MockRestHandler } from "../types";
import { TEST_PASSWORD } from "../constants";

export const postUserSignin: MockRestHandler = (req, res, ctx) => {
  const { email, password } = req.body as LoginRequest;
  const userEmails = USERS_DATA.map((user) => user.email);
  const user = USERS_DATA.find((user) => user.email === email);
  if (userEmails.includes(email) && password === TEST_PASSWORD) {
    return res(
      ctx.status(200),
      ctx.json({
        encryptedJWTToken: `token-for-${user?.id}`,
      }),
    );
  }
  return res(ctx.status(401), ctx.json({ errorMessage: "Incorrect username or password" }));
};
