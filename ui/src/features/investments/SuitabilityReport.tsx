import { Page, Text, View, Document } from "@react-pdf/renderer";
import { FormattedInvestmentData } from "./investmentDataTableUtils";
import { styles } from "./pdfStyles";
interface SuitabilityReportProps {
  aggId: string;
  tableData: FormattedInvestmentData;
}

const SuitabilityReport = ({ aggId, tableData }: SuitabilityReportProps) => {
  return (
    <Document title="My Report">
      <Page size="A4" style={styles.homePage}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Suitability Report</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.idText}>{`id: ${aggId}`}</Text>
        </View>
      </Page>
      <Page size="A4" wrap style={styles.homePage}>
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
      <Page size="A4" wrap style={styles.homePage}>
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
