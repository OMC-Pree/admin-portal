import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const cpbBaseUrl =
  process.env.REACT_APP_ENV === "prod"
    ? process.env.REACT_APP_PROD_CPB_BASE_URL
    : process.env.REACT_APP_ENV === "staging"
    ? process.env.REACT_APP_STG_CPB_BASE_URL
    : process.env.REACT_APP_ENV === "dev"
    ? process.env.REACT_APP_DEV_CPB_BASE_URL
    : process.env.REACT_APP_TEST_CPB_BASE_URL;
// Client Portal Backend API
export const cpbApi = createApi({
  reducerPath: "cpbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: cpbBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
