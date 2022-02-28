import { rest, RestHandler } from "msw";
import { getUserMyAccount } from "./get/getUserMyAccount";
import { postUserSignin } from "./post/postUserSignin";
import { getTokenDecrypt } from "./get/getTokenDecrypt";
import { getUsers } from "./get/getUsers";
import { patchUser } from "./patch/patchUser";
import { idpBaseUrl } from "../../api/idpApi";
import { postUserBulkCreate } from "./post/postUserBulkCreate";

let handlers: RestHandler[] = [];

if (process.env.NODE_ENV === "test" || process.env.REACT_APP_MSW_IDP === "true") {
  handlers = [
    rest.post(`${idpBaseUrl}v1/user/signin`, postUserSignin),
    rest.post(`${idpBaseUrl}v1/user/bulk-create`, postUserBulkCreate),
    rest.get(`${idpBaseUrl}v1/token/decrypt`, getTokenDecrypt),
    rest.get(`${idpBaseUrl}v1/users`, getUsers),
    rest.get(`${idpBaseUrl}v1/user/myaccount`, getUserMyAccount),
    rest.patch(`${idpBaseUrl}v1/user/:userId`, patchUser),
  ];
}

export default handlers;
