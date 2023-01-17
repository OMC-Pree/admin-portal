import { GetOrganisationsRequest, GetOrganisationsResponse } from "../models/httpCalls";
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
  }),
});

export const {
  useGetOrganisationsQuery,
  useLazyGetOrganisationsQuery,
  useGetOrganisationByIdQuery,
} = organisationsApi;
