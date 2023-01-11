import { useMemo } from "react";
import { AllDataAnswerAggregation } from "./types";
import { IUser } from "../user/userModels";
import { convertAllDataItemsToMap } from "./utils";
import { useGetAllDataAnswerAggregationQuery } from "../../api/genericAnswers";

function useAnswerAggregation<T>(
  id: AllDataAnswerAggregation["id"] = "",
  idpUserId: IUser["id"] = "",
): {
  aggregation: AllDataAnswerAggregation | undefined;
  questions: Record<keyof T, string> | undefined;
  formData: T | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
} {
  const {
    data: aAgg,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllDataAnswerAggregationQuery({ id, idpUserId }, { skip: !id || !idpUserId });

  return useMemo(() => {
    const agg = aAgg && aAgg?.data[0];
    return {
      aggregation: agg,
      questions: agg
        ? Object.keys(agg.items).reduce((acc, key) => {
            const {
              question: { name, humanReadableQuestion },
            } = agg.items[key];
            return { ...acc, [name]: humanReadableQuestion };
          }, {} as Record<keyof T, string>)
        : undefined,
      formData: agg ? convertAllDataItemsToMap<T>(agg.items) : undefined,
      isLoading,
      isSuccess,
      isError,
    };
  }, [aAgg]);
}

export default useAnswerAggregation;
