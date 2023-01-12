import { format, isValid, parseISO } from "date-fns";
import { CustomTableProps, CustomTableRow } from "../../components/table/CustomTable";
import { StyleSheet } from "@react-pdf/renderer";
import { AllDataAnswerAggregation, GenericAnswerValueType } from "../aggregations/types";

const capitalise = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const breakCamelCase = (str: string): string => {
  return str
    .split(/(?=[A-Z])/)
    .map((s) => capitalise(s))
    .join(" ");
};

export type FormattedInvestmentData = {
  mainTable: CustomTableRow[];
  otherTables: CustomTableProps[];
};

type JSONAnswer = {
  [key: string]: unknown;
};

export const formatData = (data: AllDataAnswerAggregation): FormattedInvestmentData => {
  const mainTableData: FormattedInvestmentData["mainTable"] = [];
  const otherTableData: FormattedInvestmentData["otherTables"] = [];

  const addMainTableRow = (key: string, question: string, answerValue: string) => {
    const dataPoint = {
      items: [
        {
          content: key,
        },
        {
          content: question,
        },
        {
          content: answerValue,
        },
      ],
    };
    mainTableData.push(dataPoint);
  };
  const addOtherTableData = (tableRows: CustomTableRow[], title: string) => {
    const dataPoint = {
      headers: [
        {
          content: `${title}`,
        },
        {
          content: "",
        },
      ],
      rows: tableRows,
    };
    otherTableData.push(dataPoint);
  };

  Object.keys(data.items).forEach(function (key) {
    const item = data.items[key];
    let answerValue = "";

    const answerType = item.answer?.valueType as GenericAnswerValueType;
    if (answerType === GenericAnswerValueType.STRING) {
      const providedAnswer = item.answer?.valueString as string;

      const parsedDate = parseISO(providedAnswer);
      const isValidDate = isValid(parsedDate);
      answerValue = `${providedAnswer}`;
      if (isValidDate) {
        answerValue = `${format(parsedDate, "PPP")} `;
      }

      addMainTableRow(key, item.question.humanReadableQuestion, answerValue);
      return;
    }

    if (answerType === GenericAnswerValueType.NUMBER) {
      answerValue = `${item.answer?.valueNumber}`;
      addMainTableRow(key, item.question.humanReadableQuestion, answerValue);
      return;
    }

    if (answerType === GenericAnswerValueType.BOOLEAN) {
      answerValue = `${item.answer?.valueBoolean}`;
      addMainTableRow(key, item.question.humanReadableQuestion, answerValue);
      return;
    }

    if (answerType === GenericAnswerValueType.JSON) {
      const answer: JSONAnswer = item.answer?.valueJSON as JSONAnswer;
      if (answer.data) {
        const arrayAnswer: unknown[] = answer.data as unknown[];
        const tableRows = arrayAnswer.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = Object.entries(item as any).map(([key, value]) => {
            const parsedDate = parseISO(value as string);
            const isValidDate = isValid(parsedDate);
            answerValue = `${value}`;
            if (isValidDate) {
              answerValue = `${format(parsedDate, "PPP")} `;
            }

            return {
              items: [{ content: breakCamelCase(key) }, { content: `${answerValue}` }],
            };
          });
          return data;
        });

        const wholeTable = tableRows.flat();
        addOtherTableData(wholeTable, key);
        return;
      }
      if (answer.data === null) {
        return;
      }

      const rows = Object.entries(answer).map(([key, value]) => {
        const readableKey = breakCamelCase(key);

        const parsedDate = parseISO(value as string);
        const isValidDate = isValid(parsedDate);
        answerValue = `${value}`;
        if (isValidDate) {
          answerValue = `${format(parsedDate, "PPP")} `;
        }

        return {
          items: [{ content: readableKey }, { content: `${answerValue}` }],
        };
      });
      const wholeTable = rows.flat();
      addOtherTableData(wholeTable, key);
    }
  });
  return { mainTable: mainTableData, otherTables: otherTableData };
};

/* PDF Styles */
export const styles = StyleSheet.create({
  homePage: {
    flexDirection: "row",
    backgroundColor: "#FFF",
  },
  page: {
    backgroundColor: "#FFF",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: "100%",
  },
  tableSection: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    flexGrow: 1,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    marginLeft: 10,
    marginRight: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  bodyCell: {
    display: "flex",
    width: "40%",
    fontSize: 10,
  },
  smallBodyCell: {
    display: "flex",
    width: "60%",
    fontSize: 8,
  },
  idText: {
    fontSize: 10,
  },
  titleText: {
    fontSize: 20,
  },
});
