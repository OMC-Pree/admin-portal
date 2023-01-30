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
    }),

    getOrganisationById: builder.query<GetOrganisationsResponse, GetOrganisationsRequest>({
      query: (params) => ({
        url: `v1/organisation-identity?id=${params.id}`,
      }),
    }),
    updateOrganisationById: builder.mutation<GetOrganisationsResponse, Partial<Organisation>>({
      query: (params) => ({
        url: `v1/organisation-identity/${params.id}`,
        method: "PATCH",
        body: {
          name: params.name,
        },
      }),
    }),

    createOrganisations: builder.mutation<GetOrganisationsResponse, CreateOrganisationRequest>({
      query: (body) => ({
        url: "v1/organisation-identity",
        method: "POST",
        body,
      }),
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
