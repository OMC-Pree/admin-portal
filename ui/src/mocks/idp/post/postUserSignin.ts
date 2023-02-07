import { LoginRequest } from "../../../models/httpCalls";
import { MOCK_USERS } from "../../data/mockUsers";
import { MockRestHandler } from "../../types";
import { TEST_PASSWORD } from "../../constants";

export const postUserSignin: MockRestHandler = (req, res, ctx) => {
  const { email, password } = req.body as LoginRequest;
  const userEmails = MOCK_USERS.map((user) => user.email);
  const user = MOCK_USERS.find((user) => user.email === email);
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
