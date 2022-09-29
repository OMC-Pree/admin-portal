import { DefaultBodyType, ResponseResolver, RestContext, RestRequest } from "msw";

export type MockRestHandler = ResponseResolver<RestRequest, RestContext, DefaultBodyType>;
