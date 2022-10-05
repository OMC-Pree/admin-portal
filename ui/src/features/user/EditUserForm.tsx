import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { FormProvider, useForm, useWatch, FieldValues } from "react-hook-form";
import TextInput from "../../components/form/TextInput";
import { IUser } from "./user";
import SelectInput from "../../components/form/SelectInput";
import { UserPermissions, UserType } from "./userEnums";
import { noop, startCase, upperFirst } from "lodash";
import { useUpdateUserMutation } from "../../api/users";
import { useAppDispatch } from "../../hooks/store";
import { updateStoredCoach } from "../coaches/coachesSlice";
import useCoaches from "../coaches/useCoaches";

interface IEditUserFormProps {
  user: IUser;
  onSuccess: () => void;
  onCancel?: () => void;
}

interface AutoCompleteCoach {
  label: string;
  id: string;
}

interface FormData extends FieldValues {
  firstName: string;
  lastName: string;
  type: UserType;
  permissions: UserPermissions[];
  coachUserId?: string;
}

function EditUserForm({ user, onSuccess, onCancel = noop }: IEditUserFormProps) {
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();
  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      type: user.type || "",
      permissions: user.permissions || [],
    },
  });

  const {
    control,
    formState: { isDirty, isValid },
  } = methods;

  const [selectedCoach, setSelectedCoach] = useState<AutoCompleteCoach>({
    label: "",
    id: "",
  });
  const { coaches, coachOptions } = useCoaches();

  useEffect(() => {
    if (coachOptions?.length) {
      if (user.coachUserId) {
        const currentCoach = coachOptions.find((coach) => coach.id === user.coachUserId);
        if (currentCoach) {
          setSelectedCoach(currentCoach);
        }
      }
    }
  }, [coachOptions]);

  const isClient = useWatch({ name: "type", control }) === UserType.CLIENT;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: AutoCompleteCoach | null,
  ) => {
    setSelectedCoach(value as AutoCompleteCoach);
  };

  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      const newData: FormData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        id: user.id,
        type: data.type,
        permissions: data.permissions,
      };

      if (data.type === UserType.CLIENT && newData.permissions.includes(UserPermissions.CLIENT)) {
        newData.coachUserId = selectedCoach.id;
      }

      await updateUser(newData);
      if (user.type === UserType.COACH) dispatch(updateStoredCoach(newData));
      onSuccess();
    },
    [user.id, selectedCoach.id],
  );

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing={2}>
          <TextInput
            control={control}
            name="firstName"
            label="First name"
            rules={{ required: true }}
          />
          <TextInput
            control={control}
            name="lastName"
            label="Last name"
            rules={{ required: true }}
          />
          <SelectInput
            control={control}
            name="type"
            label="Type"
            options={[
              { label: upperFirst(UserType.COACH), value: UserType.COACH },
              { label: upperFirst(UserType.CLIENT), value: UserType.CLIENT },
              { label: upperFirst(UserType.MANAGER), value: UserType.MANAGER },
            ]}
          />
          <SelectInput
            control={control}
            name="permissions"
            label="Permissions"
            multiple
            options={Object.keys(UserPermissions)
              .filter((perm) => perm !== UserPermissions.UNSECURE_ROOT)
              .map((perm) => ({
                label: upperFirst(startCase(perm).toLowerCase()),
                value: perm,
              }))}
          />
          {isClient && coaches && (
            <Autocomplete
              disablePortal
              options={coachOptions}
              value={selectedCoach}
              onChange={handleChange}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...methods.register("coachUserId")}
                  label="Assigned Coach"
                />
              )}
            />
          )}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="outlined" onClick={onCancel}>
              CANCEL
            </Button>
            <Button type="submit" variant="contained" disabled={!isDirty || !isValid}>
              SAVE
            </Button>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default EditUserForm;
