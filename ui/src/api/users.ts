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
        url: "v1/users",
        params,
      }),
    }),
    getManagers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "v1/users",
        params: { ...params, type: "manager" },
      }),
    }),
    getCoaches: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "v1/users",
        params: { ...params, type: "coach" },
      }),
    }),
    getClients: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "v1/users",
        params: { ...params, type: "client" },
      }),
    }),
    getClientsByCoachId: builder.query<GetUsersResponse, string | undefined>({
      query: (id: string) => `v1/users?coachUserId=${id}`,
    }),
    getUserById: builder.query<GetUsersResponse, string | void>({
      query: (id: string) => `v1/users?id=${id}`,
    }),
    myAccount: builder.query<StandardUsersResponse, void>({
      query: () => ({
        url: `v1/user/myaccount`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<GetUsersResponse, Partial<IUser>>({
      query: (user) => ({
        url: `v1/user/${user.id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    bulkCreateUser: builder.mutation<GetUsersResponse, IDPNewUser[]>({
      query: (body) => ({
        url: "v2/user/bulk-create",
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
  useGetClientsQuery,
  useLazyGetClientsQuery,
  useGetCoachesQuery,
  useGetClientsByCoachIdQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useMyAccountQuery,
} = clientsApi;
