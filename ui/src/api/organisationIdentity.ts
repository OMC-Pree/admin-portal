import { IdpApiTags } from "../features/auth/authEnums";
import { Organisation } from "../features/organisations/organisationModel";
import {
  CreateOrganisationRequest,
  GetOrganisationsRequest,
  GetOrganisationsResponse,
} from "../models/httpCalls";
import { idpApi } from "./idpApi";

export const organisationsApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganisations: builder.query<GetOrganisationsResponse, GetOrganisationsRequest | void>({
      query: (params) => {
        return params
          ? {
              url: "v1/organisation-identity",
              params,
            }
          : {
              url: "v1/organisation-identity",
            };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: IdpApiTags.ORG, id })),
              { type: IdpApiTags.ORG },
            ]
          : [{ type: IdpApiTags.ORG }],
    }),

    getOrganisationById: builder.query<GetOrganisationsResponse, GetOrganisationsRequest>({
      query: (params) => ({
        url: `v1/organisation-identity?id=${params.id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: IdpApiTags.ORG, id }],
    }),
    updateOrganisationById: builder.mutation<GetOrganisationsResponse, Partial<Organisation>>({
      query: (params) => ({
        url: `v1/organisation-identity/${params.id}`,
        method: "PATCH",
        body: {
          name: params.name,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: IdpApiTags.ORG, id: id }],
    }),

    createOrganisations: builder.mutation<GetOrganisationsResponse, CreateOrganisationRequest>({
      query: (body) => ({
        url: "v1/organisation-identity",
        method: "POST",
        body,
      }),
      invalidatesTags: [IdpApiTags.ORG],
    }),
  }),
});

export const {
  useGetOrganisationsQuery,
  useLazyGetOrganisationsQuery,
  useGetOrganisationByIdQuery,
  useUpdateOrganisationByIdMutation,
  useCreateOrganisationsMutation,
} = organisationsApi;
