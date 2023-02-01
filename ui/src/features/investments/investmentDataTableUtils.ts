import { format, isValid, parseISO } from "date-fns";
import { startCase } from "lodash";
import { CustomTableProps, CustomTableRow } from "../../components/table/CustomTable";
import {
  AllDataAnswerAggregation,
  GenericAnswer,
  GenericAnswerValueType,
} from "../aggregations/types";
import { InvestmentForm } from "./models";

export type FormattedInvestmentData = {
  mainTable: CustomTableRow[];
  otherTables: CustomTableProps[];
};

const addMainTableRow = (key: string, question: string, answerValue: string) => ({
  items: [{ content: key }, { content: question }, { content: answerValue }],
});

const addOtherTableData = (tableRows: CustomTableRow[], title: string) => ({
  headers: [{ content: `${title}` }, { content: "" }],
  rows: tableRows,
});

export const formatData = (
  data: AllDataAnswerAggregation,
  formValues: InvestmentForm,
): FormattedInvestmentData => {
  const mainTableData: FormattedInvestmentData["mainTable"] = [];
  const otherTableData: FormattedInvestmentData["otherTables"] = [];

  Object.keys(formValues).forEach((key) => {
    const { humanReadableQuestion, valueType } = data.items[key].question;
    const answerType = valueType as GenericAnswerValueType;
    let answerValue = formValues[key as keyof InvestmentForm];
    let jsonAnswer: GenericAnswer["valueJSON"];

    switch (answerType) {
      case GenericAnswerValueType.JSON:
        jsonAnswer = formValues[key as keyof InvestmentForm] as GenericAnswer["valueJSON"];
        if (jsonAnswer?.data) {
          const tableRows = jsonAnswer.data
            .map((item) =>
              Object.entries(item as [string, unknown]).map(([key, value]) => {
                answerValue = String(value);
                const parsedDate = parseISO(answerValue);
                answerValue = isValid(parsedDate) ? format(parsedDate, "PPP") : answerValue;
                return {
                  items: [{ content: startCase(key) }, { content: `${answerValue}` }],
                };
              }),
            )
            .flat();
          otherTableData.push(addOtherTableData(tableRows, key));
          return;
        }
        break;
      case GenericAnswerValueType.STRING:
      case GenericAnswerValueType.NUMBER:
      case GenericAnswerValueType.BOOLEAN:
      default:
        answerValue = String(answerValue);
        if (answerType === GenericAnswerValueType.STRING) {
          const parsedDate = parseISO(answerValue);
          answerValue = isValid(parsedDate) ? `${format(parsedDate, "PPP")} ` : answerValue;
        }
        mainTableData.push(addMainTableRow(key, humanReadableQuestion, answerValue));
        break;
    }
  });

  return { mainTable: mainTableData, otherTables: otherTableData };
};
