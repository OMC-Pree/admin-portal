import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const idpBaseUrl =
  process.env.REACT_APP_ENV === "prod"
    ? process.env.REACT_APP_PROD_IDP_BASE_URL
    : process.env.REACT_APP_ENV === "staging"
    ? process.env.REACT_APP_STG_IDP_BASE_URL
    : process.env.REACT_APP_ENV === "dev"
    ? process.env.REACT_APP_DEV_IDP_BASE_URL
    : process.env.REACT_APP_TEST_IDP_BASE_URL;

export const idpApi = createApi({
  reducerPath: "idpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: idpBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
