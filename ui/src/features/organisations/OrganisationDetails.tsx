import { Box, Stack } from "@mui/material";
import { parseISO, format } from "date-fns";
import { useParams } from "react-router-dom";
import { useGetOrganisationByIdQuery } from "../../api/organisationIdentity";
import DetailItem from "../../components/DetailItem";

const OrganisationDetails = () => {
  const { organisationId } = useParams();
  const { data } = useGetOrganisationByIdQuery({ id: organisationId });
  const organisation = data?.data[0];

  return (
    <Box>
      {organisation && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <DetailItem prop="Organisation ID" value={organisation.id} />
          <DetailItem prop="Organisation Name" value={organisation.name} />
          <DetailItem
            prop="Created At"
            value={format(parseISO(organisation.createdAt), "dd/MM/yyyy")}
          />
          <DetailItem
            prop="Last Updated At"
            value={format(parseISO(organisation.updatedAt), "dd/MM/yyyy")}
          />
        </Stack>
      )}
    </Box>
  );
};

export default OrganisationDetails;
