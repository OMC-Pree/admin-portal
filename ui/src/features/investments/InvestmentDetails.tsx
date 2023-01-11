import { Stack } from "@mui/material";
import CustomTable, { CustomTableProps, CustomTableRow } from "../../components/table/CustomTable";

const InvestmentDetails = ({
  mainTable,
  otherTables,
}: {
  mainTable: CustomTableRow[];
  otherTables: CustomTableProps[];
}) => {
  return (
    <Stack gap={3}>
      <CustomTable
        headers={[{ content: "Key" }, { content: "Question" }, { content: "Answer" }]}
        rows={mainTable}
      />
      {otherTables.map((table, index) => (
        <CustomTable headers={table.headers} rows={table.rows} key={index} />
      ))}
    </Stack>
  );
};

export default InvestmentDetails;
