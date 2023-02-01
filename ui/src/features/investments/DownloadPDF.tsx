import { usePDF } from "@react-pdf/renderer";
import SuitabilityReport from "./SuitabilityReport";
import { FormattedInvestmentData } from "./investmentDataTableUtils";

const DownloadPDF = ({
  aggId,
  tableData,
}: {
  aggId: string;
  tableData: FormattedInvestmentData;
}) => {
  const [instance] = usePDF({
    document: <SuitabilityReport aggId={aggId} tableData={tableData} />,
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
