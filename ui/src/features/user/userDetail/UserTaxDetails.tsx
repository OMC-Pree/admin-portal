import { IUser } from "../userModels";
import { useMemo } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import InfoField from "../../../components/InfoField";

interface UserTaxDetailsProps {
  client: IUser;
}

const UserTaxDetails = ({ client }: UserTaxDetailsProps) => {
  const { nin, otherIds } = useMemo(
    () =>
      client.nationalitiesIds?.length
        ? {
            nin: client.nationalitiesIds[0].identifiers[0].value,
            otherIds: client.nationalitiesIds.slice(1),
          }
        : { nin: undefined, otherIds: undefined },
    [client.nationalitiesIds],
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Tax Details</Typography>
      <Divider />
      <Stack gap={3} sx={{ pl: 1 }}>
        <InfoField label="Country of Birth" answer={client.countryOfBirthAlpha2} />
        {client.nationalitiesIds?.length ? (
          <InfoField label="National Insurance Number" answer={nin} />
        ) : (
          <></>
        )}
        <InfoField label="Nationality" answer={client.nationalityAlpha2} />
        {otherIds?.map((id, idx) => (
          <Stack gap={3} key={`nationality-id-${idx}`}>
            <InfoField label="Identifier Document Name" answer={id.identifiers[0].name} />
            <InfoField label="Identifier Value" answer={id.identifiers[0].value} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default UserTaxDetails;
