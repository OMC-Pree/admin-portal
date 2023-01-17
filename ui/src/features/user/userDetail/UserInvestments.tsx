import { Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IUser, UserAnswerAggList } from "../userModels";

interface UserInvestmentsProps {
  client: IUser;
}

const UserInvestments = ({ client }: UserInvestmentsProps) => {
  const [investments] = useState<UserAnswerAggList["UK_INVESTMENT_ADVICE_V1"] | null>(
    client.qaClient?.answerAggregationList.UK_INVESTMENT_ADVICE_V1 || null,
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Investments</Typography>
      <Divider />
      <Stack gap={2}>
        {investments === null && <Typography>No investments</Typography>}
        {investments && (
          <Typography key={`${investments}`}>
            <Link to={`/clients/${client.id}/investments/${investments}`}>
              Investment Application
            </Link>
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default UserInvestments;
