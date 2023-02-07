import { Page, Text, View, Document } from "@react-pdf/renderer";
import { IUser } from "../../user/userModels";
import { FormattedInvestmentData } from "../investmentDataTableUtils";
import { styles } from "./pdfStyles";
import { AllDataAnswerAggregation } from "../../aggregations/types";
import Page1 from "./Page1";
interface SuitabilityReportProps {
  client: IUser;
  tableData: FormattedInvestmentData;
  rawData: AllDataAnswerAggregation;
}

const SuitabilityReport = ({ client, tableData, rawData }: SuitabilityReportProps) => {
  return (
    <Document title="My Report">
      <Page1 client={client} rawData={rawData} />

      <Page size="A4" wrap>
        <View style={styles.section}>
          <Text>Section #1 - Main Table</Text>
          <View style={styles.tableSection}>
            {tableData.mainTable.map((row, index) => {
              return (
                <View style={styles.tableRow} key={index} wrap={false}>
                  {row.items.map((cell, index) => {
                    if (index === 0) return null;

                    return (
                      <Text
                        style={index === 0 ? styles.smallBodyCell : styles.bodyCell}
                        key={index}
                      >
                        {cell.content}
                      </Text>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </Page>
      <Page size="A4" wrap>
        <View style={styles.section}>
          <Text>Section #2 - Sub Tables</Text>
          {tableData.otherTables.map((table, index) => {
            return (
              <View style={styles.tableSection} key={`${table.headers[0].content}_${index}`}>
                {table.rows.map((row, index) => {
                  return (
                    <View style={styles.tableRow} key={`${index}`}>
                      {row.items.map((cell, index) => {
                        return (
                          <Text style={styles.bodyCell} key={index}>
                            {cell.content}
                          </Text>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default SuitabilityReport;
