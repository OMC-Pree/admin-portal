import {
  ChangePasswordRequest,
  GetUsersRequest,
  GetUsersResponse,
  IdpStandardResponse,
} from "../models/httpCalls";
import { UserMyAccountResponse } from "../models/user";
import { idpApi } from "./idpApi";

export const clientsApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "users",
        params,
      }),
    }),
    getCoaches: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "users",
        params: { ...params, type: "coach" },
      }),
    }),
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
  useGetUsersQuery,
  useLazyGetCoachesQuery,
  useGetCoachesQuery,
  useChangePasswordMutation,
  useGetClientsByCoachIdQuery,
  useGetUserByIdQuery,
  useMyAccountQuery,
} = clientsApi;
