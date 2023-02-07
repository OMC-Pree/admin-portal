import { usePDF } from "@react-pdf/renderer";
import SuitabilityReport from "./report/SuitabilityReport";
import { FormattedInvestmentData } from "./investmentDataTableUtils";
import { IUser } from "../user/userModels";
import { AllDataAnswerAggregation } from "../aggregations/types";

const DownloadPDF = ({
  tableData,
  client,
  rawData,
}: {
  client: IUser;
  tableData: FormattedInvestmentData;
  rawData: AllDataAnswerAggregation;
}) => {
  const [instance] = usePDF({
    document: <SuitabilityReport client={client} tableData={tableData} rawData={rawData} />,
  });

  if (instance.loading || !instance.url) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <>
      <a href={instance.url} download="SuitabilityReport.pdf">
        Download PDF
      </a>
    </>
  );
};

export default DownloadPDF;
