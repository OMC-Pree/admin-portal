import { IdpApiTags } from "../features/auth/authEnums";
import {
  GetUsersRequest,
  GetUsersResponse,
  IDPNewUser,
  StandardUsersResponse,
  UpdateUserAccessRequest,
  UpdateUserRequest,
} from "../models/httpCalls";
import { idpApi } from "./idpApi";

const getUsersProvidesTags = (result: GetUsersResponse | undefined) => {
  const providerTags = result
    ? [
        ...result.data.map(({ id }) => ({
          type: IdpApiTags.USER,
          id,
        })),
        IdpApiTags.USER,
      ]
    : [IdpApiTags.USER];
  return providerTags;
};

export const clientsApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "v1/users",
        params,
      }),
      providesTags: getUsersProvidesTags,
    }),
    getClients: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: "v1/users",
        params: { ...params, type: "client" },
      }),
      providesTags: getUsersProvidesTags,
    }),
    getUsersByCoachId: builder.query<
      GetUsersResponse,
      { coachId?: string; max?: number; lastEvaluatedKey?: string }
    >({
      query: (params) => ({
        url: `v1/users?coachUserId=${params.coachId}`,
        params: { max: params.max, lastEvaluatedKey: params.lastEvaluatedKey },
      }),
      providesTags: getUsersProvidesTags,
    }),
    getUserById: builder.query<GetUsersResponse, string | undefined>({
      query: (id) => ({ url: "v1/users", method: "GET", params: { id } }),
      providesTags: getUsersProvidesTags,
    }),
    getUsersByType: builder.query<GetUsersResponse, GetUsersRequest>({
      query: ({ type, ...rest }) => ({ url: "v1/users", method: "GET", params: { type, ...rest } }),
      providesTags: getUsersProvidesTags,
    }),
    myAccount: builder.query<StandardUsersResponse, void>({
      query: () => ({
        url: `v1/user/myaccount`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: IdpApiTags.USER, id: result?.data[0].id }],
    }),
    updateUser: builder.mutation<GetUsersResponse, UpdateUserRequest>({
      query: (user) => ({
        url: `v1/user/${user.id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: IdpApiTags.USER, id }],
    }),
    updateUserAccess: builder.mutation<GetUsersResponse, UpdateUserAccessRequest>({
      query: ({ id, ...rest }) => ({
        url: `v1/support/user-access/${id}`,
        method: "PATCH",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: IdpApiTags.USER, id }],
    }),
    bulkCreateUser: builder.mutation<GetUsersResponse, IDPNewUser[]>({
      query: (body) => ({
        url: "v2/user/bulk-create",
        method: "POST",
        body,
      }),
      invalidatesTags: [IdpApiTags.USER],
    }),
  }),
});

export const {
  useBulkCreateUserMutation,
  useGetUsersQuery,
  useGetClientsQuery,
  useLazyGetClientsQuery,
  useGetUsersByCoachIdQuery,
  useLazyGetUsersByCoachIdQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUsersByTypeQuery,
  useLazyGetUsersByTypeQuery,
  useUpdateUserMutation,
  useUpdateUserAccessMutation,
  useMyAccountQuery,
} = clientsApi;
