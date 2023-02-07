import {
  TokenDecryptResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RecoverPasswordRequest,
  RegisterUserResponse,
  RegisterUserRequest,
  VerifyEmailRequest,
} from "../models/httpCalls";
import { idpApi } from "./idpApi";

export const authApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    login2FA: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "v2/user/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (data) => ({
        url: "v1/user/register",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<undefined, ForgotPasswordRequest>({
      query: (objWithEmail) => ({
        url: "v1/user/forgot-password",
        method: "POST",
        body: objWithEmail,
      }),
    }),
    recoverPassword: builder.mutation<undefined, RecoverPasswordRequest>({
      query: (body) => ({
        url: "v1/user/recover-password",
        method: "POST",
        body,
      }),
    }),
    decryptToken: builder.query<TokenDecryptResponse, string | null>({
      query: (encryptedToken: string | null) => ({
        url: `v1/token/decrypt`,
        method: "GET",
        headers: {
          authorization: `Bearer ${encryptedToken}`,
        },
      }),
    }),
    emailVerified: builder.query<undefined, VerifyEmailRequest>({
      query: ({ token }) => ({
        url: `v1/user/email-verified?emailVerifiedToken=${token}`,
        method: "GET",
      }),
    }),
    verifyEmail: builder.mutation<undefined, VerifyEmailRequest>({
      query: (body) => ({
        url: "v1/user/email-verified",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyDecryptTokenQuery,
  useEmailVerifiedQuery,
  useLogin2FAMutation,
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
} = authApi;
