import { IUser } from "../user";
import React, { useMemo } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import InfoField from "../../../components/InfoField";

interface UserTaxDetailsProps {
  client: IUser;
}

const UserTaxDetails = ({ client }: UserTaxDetailsProps) => {
  const nin = useMemo(
    () =>
      client.nationalitiesIds?.find((nation) => nation.position === 1)?.identifiers[0].value ||
      undefined,
    [client.nationalitiesIds],
  );

  const otherNationalityIdentifier = useMemo(
    () =>
      client.nationalitiesIds?.find((nation) => nation.position !== 1)?.identifiers[0].value ||
      undefined,
    [client.nationalitiesIds],
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Tax Details</Typography>
      <Divider />
      <Stack gap={3} sx={{ pl: 1 }}>
        <InfoField label="Country of Birth" answer={client.countryOfBirthAlpha2} />
        <InfoField label="National Insurance Number" answer={nin} />
        <InfoField label="Nationality" answer={client.nationalityAlpha2} />
        {otherNationalityIdentifier && (
          <>
            <InfoField label="Identifier Document Name" answer={otherNationalityIdentifier.name} />
            <InfoField label="Identifier Value" answer={otherNationalityIdentifier.value} />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default UserTaxDetails;
