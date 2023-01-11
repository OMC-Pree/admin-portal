import { Typography, Stack } from "@mui/material";
import GoBack from "../components/GoBack";
import RequireAuth from "../features/auth/RequireAuth";
import { useParams } from "react-router-dom";
import useDetailUser from "../features/user/userDetail/useDetailUser";
import InvestmentDetails from "../features/investments/InvestmentDetails";
import DownloadPDF from "../features/investments/DownloadPDF";
import useAnswerAggregation from "../features/aggregations/useAnswerAggregation";
import { useEffect, useState } from "react";
import { formatData, FormattedInvestmentData } from "../features/investments/investmentUtils";

const InvestmentDetailPage = () => {
  const { clientId, investmentId } = useParams();
  const { detailUser: client, isFetching } = useDetailUser(clientId);

  const { aggregation: investmentAgg } = useAnswerAggregation(investmentId, clientId);
  const [formattedInvestmentData, setFormattedInvestmentData] =
    useState<FormattedInvestmentData | null>(null);

  useEffect(() => {
    if (investmentAgg) {
      const formattedData = formatData(investmentAgg);
      setFormattedInvestmentData(formattedData);
    }
  }, [investmentAgg]);

  if (!clientId || !investmentId) return null;

  return (
    <RequireAuth>
      <GoBack />
      <Typography variant="h4">Investment Application</Typography>
      {client && !isFetching && formattedInvestmentData && investmentAgg ? (
        <Stack>
          <Typography variant="h5">
            {client.firstName} {client.lastName}
          </Typography>
          <DownloadPDF aggId={investmentAgg.id} tableData={formattedInvestmentData} />
          <InvestmentDetails
            mainTable={formattedInvestmentData.mainTable}
            otherTables={formattedInvestmentData.otherTables}
          />
        </Stack>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </RequireAuth>
  );
};

export default InvestmentDetailPage;
