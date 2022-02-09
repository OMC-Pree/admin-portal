import { rest, RestHandler } from "msw";
import { getUserMyAccount } from "./get/getUserMyAccount";
import { postUserSignin } from "./post/postUserSignin";
import { getTokenDecrypt } from "./get/getTokenDecrypt";
import { getUsers } from "./get/getUsers";
import { patchUser } from "./patch/patchUser";

export const idpBaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_IDP_BASE_URL
    : process.env.REACT_APP_DEV_IDP_BASE_URL;

let handlers: RestHandler[] = [];

if (process.env.NODE_ENV === "test" || process.env.REACT_APP_MSW_IDP === "true") {
  handlers = [
    rest.post(`${idpBaseUrl}user/signin`, postUserSignin),
    rest.get(`${idpBaseUrl}token/decrypt`, getTokenDecrypt),
    rest.get(`${idpBaseUrl}users`, getUsers),
    rest.get(`${idpBaseUrl}user/myaccount`, getUserMyAccount),
    rest.patch(`${idpBaseUrl}user/:userId`, patchUser),
  ];
}

export default handlers;
