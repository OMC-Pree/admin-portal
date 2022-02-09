import { GetUsersRequest, GetUsersResponse, StandardUsersResponse } from "../models/httpCalls";
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
      query: (id: string) => `users?coachUserID=${id}`,
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
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetCoachesQuery,
  useLazyGetClientsQuery,
  useGetCoachesQuery,
  useGetClientsByCoachIdQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useMyAccountQuery,
} = clientsApi;
