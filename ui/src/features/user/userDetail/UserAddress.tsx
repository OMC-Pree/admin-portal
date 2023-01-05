import { IUser } from "../userModels";
import { useMemo } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import InfoField from "../../../components/InfoField";

interface UserAddressProps {
  client: IUser;
}

const UserAddress = ({ client }: UserAddressProps): JSX.Element => {
  const address = useMemo(() => client.addresses?.[0] || undefined, [client.addresses]);
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Address</Typography>
      <Divider />
      {address && (
        <Stack gap={3} sx={{ pl: 1 }}>
          <InfoField label="Street1" answer={address.street1} />
          <InfoField label="Street2" answer={address.street2} />
          <InfoField label="Street3" answer={address.street3} />
          <InfoField label="Street4" answer={address.street4} />
          <InfoField label="City" answer={address.city} />
          <InfoField label="Postcode" answer={address.zipCode} />
          <InfoField label="Sub-division 1" answer={address.subDivision1} />
          <InfoField label="Country Alpha2" answer={address.countryAlpha2} />
        </Stack>
      )}
      {!address && <Typography variant="body1">No address found</Typography>}
      <Divider />
      <Typography variant="h3">Other Info</Typography>
      <Stack gap={3} sx={{ pl: 1 }}>
        <InfoField label="Biological Sex" answer={client.biologicalSex} />
      </Stack>
    </Stack>
  );
};

export default UserAddress;
