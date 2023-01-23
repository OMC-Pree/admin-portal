import { useState } from "react";
import { Alert, Box, Button, Snackbar, Stack } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import CreateOrganisationConfirmModal from "./CreateOrganisationConfirmModal";
import useOrganisations from "../useOrganisations";
import { useCreateOrganisationsMutation } from "../../../api/organisationIdentity";
import { CreateOrganisationRequest } from "../../../models/httpCalls";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/form/TextInput";
import { ErrorMessage } from "../../../components/form/ErrorMessage";
import { OrganisationType } from "../../user/organisationEnum";

const defaultValues: FieldValues = {
  organisationName: "",
};

interface ApiError {
  state: boolean;
  message: string;
}

function CreateOrganisationForm() {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiError, setApiError] = useState<ApiError>();
  const [organisationToCreate, setOrganisationToCreate] = useState<CreateOrganisationRequest>();
  const [createOrganisation] = useCreateOrganisationsMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues,
  });

  const organisationList = useOrganisations();

  const onSubmit = async (data: FieldValues) => {
    setSaveModalOpen(true);

    const newOrganisation: CreateOrganisationRequest = {
      type: OrganisationType.EMPLOYER,
      name: data.organisationName.trim(),
    };

    setOrganisationToCreate(newOrganisation);
  };

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

  const handleClose = () => {
    setApiError({ state: false, message: "" });
  };

  const doSave = async () => {
    if (!organisationToCreate) return;
    try {
      const { data } = await createOrganisation(organisationToCreate).unwrap();
      navigate(`/organisations/${data[0]?.id}`);
    } catch (error) {
      setApiError({
        message: "Something went wrong please try after sometime",
        state: true,
      });
      setSaveModalOpen(false);
    }
  };

  const onCancel = () => {
    setSaveModalOpen(false);
    navigate("/organisations");
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Snackbar
          open={apiError?.state}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert onClose={handleClose} variant="filled" severity="error">
            {apiError?.message}
          </Alert>
        </Snackbar>
        <Stack spacing={1}>
          <TextInput
            control={control}
            name="organisationName"
            label="Organisation Name"
            rules={{
              required: true,
              validate: validateOrganisationName,
            }}
          />
          <ErrorMessage message={errorMessage} />
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || Object.keys(errors).length > 0}
          >
            save
          </Button>
        </Stack>
      </Box>
      {<CreateOrganisationConfirmModal isOpen={saveModalOpen} close={onCancel} onSave={doSave} />}
    </>
  );
}

export default CreateOrganisationForm;
