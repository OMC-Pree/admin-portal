import { ChangePasswordRequest, GetUsersResponse, IdpStandardResponse } from "../models/httpCalls";
import { UserMyAccountResponse } from "../models/user";
import { idpApi } from "./idpApi";

export const clientsApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientsByCoachId: builder.query<GetUsersResponse, string | undefined>({
      query: (id: string) => `users?coachUserID=${id}`,
    }),
    getUserById: builder.query<GetUsersResponse, string | undefined>({
      query: (id: string) => `users?id=${id}`,
    }),
    myAccount: builder.query<UserMyAccountResponse, undefined>({
      query: () => ({
        url: `user/myaccount`,
        method: "GET",
      }),
    }),
    changePassword: builder.mutation<IdpStandardResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: `user/myaccount/password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetClientsByCoachIdQuery,
  useGetUserByIdQuery,
  useMyAccountQuery,
} = clientsApi;
