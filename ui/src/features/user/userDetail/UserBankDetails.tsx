import { IUser } from "../userModels";
import { useMemo } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import InfoField from "../../../components/InfoField";

interface UserBankDetailsProps {
  client: IUser;
}

const UserBankDetails = ({ client }: UserBankDetailsProps) => {
  const bankDetails = useMemo(() => client.bankDetails?.[0] || undefined, [client.bankDetails]);
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Bank Details</Typography>
      <Divider />
      {bankDetails && (
        <Stack gap={3} sx={{ pl: 1 }}>
          <InfoField label="Bank Name" answer={bankDetails.bankName} />
          <InfoField label="Sort Code" answer={bankDetails.sortCode} />
          <InfoField label="Account Number" answer={bankDetails.accountNumber} />
          <InfoField label="Account Holder Name" answer={bankDetails.accountHolderName} />
        </Stack>
      )}
      {!bankDetails && <Typography variant="body1">No Bank Details found.</Typography>}
    </Stack>
  );
};

export default UserBankDetails;
