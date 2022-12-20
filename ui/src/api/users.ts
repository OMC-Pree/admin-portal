import {
  GetUsersRequest,
  GetUsersResponse,
  IDPNewUser,
  StandardUsersResponse,
  UpdateUserAccessRequest,
  UpdateUserRequest,
} from "../models/httpCalls";
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
    getUsersByCoachId: builder.query<
      GetUsersResponse,
      { coachId?: string; max?: number; lastEvaluatedKey?: string }
    >({
      query: (params) => ({
        url: `v1/users?coachUserId=${params.coachId}`,
        params: { max: params.max, lastEvaluatedKey: params.lastEvaluatedKey },
      }),
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
    updateUser: builder.mutation<GetUsersResponse, UpdateUserRequest>({
      query: (user) => ({
        url: `v1/user/${user.id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    updateUserAccess: builder.mutation<GetUsersResponse, UpdateUserAccessRequest>({
      query: ({ id, ...rest }) => ({
        url: `v1/support/user-access/${id}`,
        method: "PATCH",
        body: { ...rest },
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
  useGetUsersByCoachIdQuery,
  useLazyGetUsersByCoachIdQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserAccessMutation,
  useMyAccountQuery,
} = clientsApi;
