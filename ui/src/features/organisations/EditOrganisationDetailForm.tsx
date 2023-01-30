import { Box, Stack } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetOrganisationByIdQuery } from "../../api/organisationIdentity";
import TextInput from "../../components/form/TextInput";
import DetailItem from "../../components/DetailItem";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import useOrganisations from "./useOrganisations";
import { ErrorMessage } from "../../components/form/ErrorMessage";

interface EditOrganisationFormProps {
  control: Control<FieldValues, object>;
}

const EditOrganisationDetailForm = ({ control }: EditOrganisationFormProps) => {
  const { organisationId } = useParams();
  const { data } = useGetOrganisationByIdQuery({ id: organisationId });
  const organisation = data?.data[0];
  const [errorMessage, setErrorMessage] = useState("");

  const organisationList = useOrganisations();

  const validateOrganisationName = (name: string) => {
    const filteredOrg = organisationList.filter(
      (org) => org.name.toLowerCase().trim() == name.toLowerCase().trim(),
    );
    if (filteredOrg?.length > 0) {
      setErrorMessage(`ERROR: Organisation Name already exists`);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  return (
    <Box component="form">
      {organisation && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <DetailItem prop="Organisation ID" value={organisation.id} />
          <TextInput
            control={control}
            name="organisationName"
            label="Organisation name"
            defaultValue={organisation.name}
            rules={{
              required: true,
              validate: validateOrganisationName,
            }}
          />
          <ErrorMessage message={errorMessage} />
          <DetailItem
            prop="Created at"
            value={format(parseISO(organisation.createdAt), "dd/MM/yyyy")}
          />
          <DetailItem
            prop="Last updated at"
            value={format(parseISO(organisation.updatedAt), "dd/MM/yyyy")}
          />
        </Stack>
      )}
    </Box>
  );
};

export default EditOrganisationDetailForm;
