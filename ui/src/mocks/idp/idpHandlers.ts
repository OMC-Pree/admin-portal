import { rest, RestHandler } from "msw";
import { postUserChangePassword } from "./postUserChangePassword";
import { postUserEmailVerified } from "./postUserEmailVerified";
import { postUserForgotPassword } from "./postUserForgotPassword";
import { getUserMyAccount } from "./getUserMyAccount";
import { postUserRecoverPassword } from "./postUserRecoverPassword";
import { postUserRegister } from "./postUserRegister";
import { postUserSignin } from "./postUserSignin";
import { getUsers } from "./getUsers";

export const idpBaseUrl = process.env.REACT_APP_IDP_BASE_URL;

let handlers: RestHandler[] = [];

if (process.env.NODE_ENV === "test" || process.env.REACT_APP_MSW_IDP === "true") {
  handlers = [
    rest.get(`${idpBaseUrl}users`, getUsers),
    rest.get(`${idpBaseUrl}user/myaccount`, getUserMyAccount),
    rest.post(`${idpBaseUrl}user/signin`, postUserSignin),
    rest.post(`${idpBaseUrl}user/forgot-password`, postUserForgotPassword),
    rest.post(`${idpBaseUrl}user/recover-password`, postUserRecoverPassword),
    rest.post(`${idpBaseUrl}user/email-verified`, postUserEmailVerified),
    rest.post(`${idpBaseUrl}user/register`, postUserRegister),
    rest.post(`${idpBaseUrl}user/myaccount/password`, postUserChangePassword),
  ];
}

export default handlers;
