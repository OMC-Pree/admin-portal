import { Stack, Breadcrumbs, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrganisationByIdQuery,
  useUpdateOrganisationByIdMutation,
} from "../../api/organisationIdentity";
import EditOrganisationModal from "./EditOrganisationModal";
import RequireAuth from "../auth/RequireAuth";

import OrganisationDetails from "./OrganisationDetails";
import { COLOURS } from "../../theme/colours";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import EditOrganisationDetailForm from "./EditOrganisationDetailForm";

const OrganisationDetailPanel = () => {
  const { organisationId } = useParams();
  const { data, isLoading } = useGetOrganisationByIdQuery({ id: organisationId });
  const [updateOrganisation] = useUpdateOrganisationByIdMutation();
  const organisation = data?.data[0];
  const [editing, setEditing] = useState(false);
  const [showEditOrgModal, setShowEditOrgModal] = useState(false);
  const [apiError, setApiError] = useState<ApiError>();
  const methods = useForm<FieldValues>({ mode: "onChange" });

  const { formState, control, watch } = methods;

  const newOrgName = watch("organisationName");

  interface ApiError {
    state: boolean;
    message: string;
  }

  const onSave = async () => {
    try {
      await updateOrganisation({
        id: organisation?.id,
        name: newOrgName,
      }).unwrap();
    } catch (error) {
      setApiError({
        message: "Something went wrong, please try again later",
        state: true,
      });
    }

    setEditing(false);
    setShowEditOrgModal(false);
  };

  const handleClose = () => {
    setApiError({ state: false, message: "" });
  };

  return (
    <RequireAuth>
      <FormProvider {...methods}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Breadcrumbs sx={{ pb: 4 }}>
            <Box component={Link} to="/organisations" sx={{ color: COLOURS.PINK[500] }}>
              Organisations table
            </Box>
            {organisation && <Typography color="text.primary">{organisation.name}</Typography>}
          </Breadcrumbs>
        </Stack>
        {isLoading || !organisation ? (
          <h3>Loading</h3>
        ) : (
          <Stack sx={{ width: 750 }} spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4">Organisation Details</Typography>
              {editing ? (
                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={() => setShowEditOrgModal(true)}
                    variant="contained"
                    size="small"
                    sx={{ height: 30 }}
                    disabled={!formState.isValid || !formState.isDirty}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ height: 30 }}
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ height: 30 }}
                  onClick={() => setEditing(true)}
                >
                  Edit
                </Button>
              )}
            </Stack>
            <Box sx={{ width: 800, height: 600 }}>
              <Snackbar
                open={apiError?.state}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert onClose={handleClose} variant="filled" severity="error">
                  {apiError?.message}
                </Alert>
              </Snackbar>
              {editing ? <EditOrganisationDetailForm control={control} /> : <OrganisationDetails />}
            </Box>
            <EditOrganisationModal
              isOpen={showEditOrgModal}
              close={() => setShowEditOrgModal(false)}
              onContinue={onSave}
            />
          </Stack>
        )}
      </FormProvider>
    </RequireAuth>
  );
};

export default OrganisationDetailPanel;
