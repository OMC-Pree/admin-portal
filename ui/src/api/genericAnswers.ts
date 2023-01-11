import { AllDataAnswerAggregation, AnswerAggregation } from "../features/aggregations/types";
import { IUser } from "../features/user/userModels";
import { OmcApiStandardResponse } from "../models/httpCalls";
import { cpbApi } from "./cpbApi";

interface CpbAllDataAnswerAggregationGETRequest {
  id: AnswerAggregation["id"];
  idpUserId: IUser["id"];
}
interface CpbAllDataAnswerAggregationGETResponse extends OmcApiStandardResponse {
  data: AllDataAnswerAggregation[];
}

export const genericAnswersApi = cpbApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDataAnswerAggregation: builder.query<
      CpbAllDataAnswerAggregationGETResponse,
      CpbAllDataAnswerAggregationGETRequest
    >({
      query: ({ id, idpUserId }) => ({
        url: `v1/answer-aggregation/all-data/${id}`,
        method: "GET",
        params: { idpUserId },
      }),
    }),
  }),
});

export const { useGetAllDataAnswerAggregationQuery, useLazyGetAllDataAnswerAggregationQuery } =
  genericAnswersApi;
