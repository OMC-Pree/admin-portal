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
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "user/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<undefined, ForgotPasswordRequest>({
      query: (objWithEmail) => ({
        url: "user/forgot-password",
        method: "POST",
        body: objWithEmail,
      }),
    }),
    recoverPassword: builder.mutation<undefined, RecoverPasswordRequest>({
      query: (body) => ({
        url: "user/recover-password",
        method: "POST",
        body,
      }),
    }),
    decryptToken: builder.query<TokenDecryptResponse, string | null>({
      query: (encryptedToken: string | null) => ({
        url: `token/decrypt`,
        method: "GET",
        headers: {
          authorization: `Bearer ${encryptedToken}`,
        },
      }),
    }),
    emailVerified: builder.query<undefined, VerifyEmailRequest>({
      query: ({ token }) => ({
        url: `user/email-verified?emailVerifiedToken=${token}`,
        method: "GET",
      }),
    }),
    verifyEmail: builder.mutation<undefined, VerifyEmailRequest>({
      query: (body) => ({
        url: "user/email-verified",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useDecryptTokenQuery,
  useEmailVerifiedQuery,
  useLoginMutation,
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
} = authApi;
