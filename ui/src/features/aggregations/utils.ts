import { GenericAnswerValueType, GenericAnswer, AllDataAnswerAggregation } from "./types";

export function formatAnswerValue(
  valueType: GenericAnswerValueType,
  answer: GenericAnswer,
): string | number | boolean | Record<string, unknown> | unknown {
  const { valueJSON, valueBoolean, valueNumber, valueString } = answer;
  switch (valueType) {
    case GenericAnswerValueType.JSON:
      if (typeof valueJSON === "string") return JSON.parse(valueJSON);
      else return valueJSON;
    case GenericAnswerValueType.BOOLEAN:
      return valueBoolean || false;
    case GenericAnswerValueType.NUMBER:
      return Number(valueNumber);
    default:
    case GenericAnswerValueType.BASE64:
    case GenericAnswerValueType.STRING:
      return valueString;
  }
}
export function convertAllDataItemsToMap<T>(items: AllDataAnswerAggregation["items"]): T {
  return Object.keys(items).reduce((acc, nextKey) => {
    const answer = items[nextKey].answer || undefined;
    return {
      ...acc,
      [nextKey]: answer ? formatAnswerValue(items[nextKey].question.valueType, answer) : undefined,
    };
  }, {} as T);
}
