import React, { useCallback, useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import TextInput from "../../../components/form/TextInput";
import { IUser } from "../user";
import SelectInput from "../../../components/form/SelectInput";
import { UserPermissions, UserType } from "../userEnums";
import { noop, startCase, upperFirst } from "lodash";
import { useUpdateUserAccessMutation } from "../../../api/users";
import { useAppDispatch } from "../../../hooks/store";
import { updateStoredCoach } from "../../coaches/coachesSlice";
import useCoaches from "../../coaches/useCoaches";
import CoachAutocomplete from "./CoachAutocomplete";

interface IEditUserFormProps {
  user: IUser;
  onSuccess: () => void;
  onCancel?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  type: UserType;
  permissions: UserPermissions[];
  coachUserId?: string;
}

function EditUserForm({ user, onSuccess, onCancel = noop }: IEditUserFormProps) {
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserAccessMutation();
  const methods = useForm<FieldValues>({ mode: "onChange" });

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    watch,
  } = methods;

  const { coaches } = useCoaches();

  const type = watch("type");
  const isClient = useMemo(() => type === UserType.CLIENT, [type]);

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      const newData: FormData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        type: data.type,
        permissions: data.permissions,
      };

      if (
        data.type === UserType.CLIENT &&
        newData.permissions.includes(UserPermissions.CLIENT) &&
        data.coachUserId
      )
        newData.coachUserId = data.coachUserId;

      await updateUser({ id: user.id, ...newData });
      if (user.type === UserType.COACH) dispatch(updateStoredCoach(newData));
      onSuccess();
    },
    [user.id],
  );

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextInput
            control={control}
            name="firstName"
            label="First name"
            defaultValue={user.firstName}
            rules={{ required: true }}
          />
          <TextInput
            control={control}
            name="lastName"
            label="Last name"
            defaultValue={user.lastName}
            rules={{ required: true }}
          />
          <SelectInput
            control={control}
            name="type"
            label="Type"
            defaultValue={user.type}
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
            defaultValue={user.permissions}
            options={Object.keys(UserPermissions)
              .filter((perm) => perm !== UserPermissions.UNSECURE_ROOT)
              .map((perm) => ({
                label: upperFirst(startCase(perm).toLowerCase()),
                value: perm,
              }))}
          />
          {isClient && coaches && <CoachAutocomplete fieldName="coachUserId" client={user} />}
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
