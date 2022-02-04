import { DefaultRequestBody, ResponseResolver, RestContext, RestRequest } from "msw";

export type MockRestHandler = ResponseResolver<RestRequest, RestContext, DefaultRequestBody>;
