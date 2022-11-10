import React, { useCallback, useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import TextInput from "../../../components/form/TextInput";
import { IUser } from "../userModels";
import SelectInput from "../../../components/form/SelectInput";
import { UserPermissions, UserType } from "../userEnums";
import { noop, startCase, upperFirst } from "lodash";
import { useUpdateUserAccessMutation, useUpdateUserMutation } from "../../../api/users";
import { useAppDispatch } from "../../../hooks/store";
import { updateStoredCoach } from "../../coaches/coachesSlice";
import useCoaches from "../../coaches/useCoaches";
import CoachAutocomplete from "./CoachAutocomplete";
import { UpdateUserAccessRequest, UpdateUserRequest } from "../../../models/httpCalls";

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
  const [updateUser] = useUpdateUserMutation();
  const [updateUserAccess] = useUpdateUserAccessMutation();
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
    async (data_: FieldValues) => {
      const data = data_ as FormData;
      const firstName = data.firstName.trim();
      const lastName = data.lastName.trim();
      const hasNewFirstName = firstName !== user.firstName;
      const hasNewLastName = lastName !== user.lastName;
      const hasNewCoach = data.coachUserId !== user.coachUserId;
      const defaultUserData: Pick<IUser, "id"> = { id: user.id };

      if (hasNewFirstName || hasNewLastName) {
        const newUserData: UpdateUserRequest = { ...defaultUserData };
        if (hasNewFirstName) newUserData.firstName = firstName;
        if (hasNewLastName) newUserData.lastName = lastName;
        await updateUser(newUserData);
      }

      const newAccessData: UpdateUserAccessRequest = {
        ...defaultUserData,
        type: data.type,
        permissions: data.permissions,
      };
      const hasNewType = newAccessData.type !== user.type;
      const hasNewPermissions =
        (newAccessData.permissions || []).length !== user.permissions.length ||
        user.permissions.reduce(
          (acc, next) => !(newAccessData.permissions || []).includes(next),
          false,
        );

      if (hasNewType || hasNewPermissions || hasNewCoach) {
        if (
          data.type === UserType.CLIENT &&
          newAccessData.permissions?.includes(UserPermissions.CLIENT) &&
          data.coachUserId
        )
          newAccessData.coachUserId = data.coachUserId;

        await updateUserAccess(newAccessData);
        if (user.type === UserType.COACH) dispatch(updateStoredCoach(newAccessData));
      }

      onSuccess();
    },
    [user],
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
