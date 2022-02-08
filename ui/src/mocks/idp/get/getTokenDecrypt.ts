import { MOCK_USERS } from "../../data/mockUsers";
import { MockRestHandler } from "../../types";
import { isAuthorised } from "../isAuthorised";

export const getTokenDecrypt: MockRestHandler = (req, res, ctx) => {
  if (!isAuthorised(req)) {
    return res(ctx.status(401), ctx.json({ errorMessage: "Invalid token" }));
  }
  const id = req.headers.get("authorization")?.replace("Bearer token-for-", "") || "";
  const user = MOCK_USERS.find((u) => u.id === id);
  return res(
    ctx.status(200),
    ctx.json({
      exp: 1634138728,
      iat: 1634052328,
      iss: "OMC Idp",
      identityUser: {
        id,
        type: user?.type,
        permissions: user?.permissions,
        emailVerified: user?.emailVerified,
      },
    }),
  );
};
