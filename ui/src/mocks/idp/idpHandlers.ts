import { rest, RestHandler } from "msw";
import { getUserMyAccount } from "./get/getUserMyAccount";
import { getTokenDecrypt } from "./get/getTokenDecrypt";
import { getUsers } from "./get/getUsers";
import { patchUser } from "./patch/patchUser";
import { idpBaseUrl } from "../../api/idpApi";
import { postUserBulkCreate } from "./post/postUserBulkCreate";
import { patchUserAccess } from "./patch/patchUserAccess";
import { userSignin2FA } from "./user-signin";

let handlers: RestHandler[] = [];

if (process.env.NODE_ENV === "test" || process.env.REACT_APP_MSW_IDP === "true") {
  handlers = [
    rest.post(`${idpBaseUrl}v2/user/bulk-create`, postUserBulkCreate),
    rest.get(`${idpBaseUrl}v1/token/decrypt`, getTokenDecrypt),
    rest.get(`${idpBaseUrl}v1/users`, getUsers),
    rest.get(`${idpBaseUrl}v1/user/myaccount`, getUserMyAccount),
    rest.patch(`${idpBaseUrl}v1/user/:userId`, patchUser),
    rest.patch(`${idpBaseUrl}v1/support/user-access/:userId`, patchUserAccess),
    rest.post(`${idpBaseUrl}v2/user/signin`, userSignin2FA),
  ];
}

export default handlers;
