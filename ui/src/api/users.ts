import {
  GetUsersRequest,
  GetUsersResponse,
  IDPNewUser,
  StandardUsersResponse,
} from "../models/httpCalls";
import { IUser } from "../features/user/user";
import { idpApi } from "./idpApi";

export const clientsApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "users",
        params,
      }),
    }),
    getManagers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "users",
        params: { ...params, type: "manager" },
      }),
    }),
    getCoaches: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "users",
        params: { ...params, type: "coach" },
      }),
    }),
    getClients: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "users",
        params: { ...params, type: "client" },
      }),
    }),
    getClientsByCoachId: builder.query<GetUsersResponse, string | undefined>({
      query: (id: string) => `users?coachUserId=${id}`,
    }),
    getUserById: builder.query<GetUsersResponse, string | void>({
      query: (id: string) => `users?id=${id}`,
    }),
    myAccount: builder.query<StandardUsersResponse, void>({
      query: () => ({
        url: `user/myaccount`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<GetUsersResponse, Partial<IUser>>({
      query: (user) => ({
        url: `user/${user.id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    bulkCreateUser: builder.mutation<GetUsersResponse, IDPNewUser[]>({
      query: (body) => ({
        url: "user/bulk-create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useBulkCreateUserMutation,
  useGetUsersQuery,
  useLazyGetManagersQuery,
  useLazyGetCoachesQuery,
  useLazyGetClientsQuery,
  useGetCoachesQuery,
  useGetClientsByCoachIdQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useMyAccountQuery,
} = clientsApi;
