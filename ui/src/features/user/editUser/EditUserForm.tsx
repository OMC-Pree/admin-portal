import { useCallback } from "react";
import { Box, Button, Stack } from "@mui/material";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import TextInput from "../../../components/form/TextInput";
import { IUser } from "../userModels";
import SelectInput from "../../../components/form/SelectInput";
import { UserPermissions, UserType } from "../userEnums";
import { noop, startCase, upperFirst } from "lodash";
import { useUpdateUserAccessMutation, useUpdateUserMutation } from "../../../api/users";
import useCoaches from "../../coaches/useCoaches";
import CoachAutocomplete from "./CoachAutocomplete";
import { UpdateUserAccessRequest, UpdateUserRequest } from "../../../models/httpCalls";
import { UserJourneyStage } from "../userEnums";
import { journeyStageList } from "../userConstants";

interface EditUserFormProps {
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
  journeyStage: UserJourneyStage;
}

function EditUserForm({ user, onSuccess, onCancel = noop }: EditUserFormProps) {
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
  const isClientOrEnquirer = type === UserType.CLIENT || type === UserType.ENQUIRER;

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
        journeyStage: data.journeyStage,
        coachUserId: data.coachUserId,
      };
      const hasNewType = newAccessData.type !== user.type;
      const hasNewPermissions =
        (newAccessData.permissions || []).length !== user.permissions.length ||
        user.permissions.reduce(
          (acc, next) => !(newAccessData.permissions || []).includes(next),
          false,
        );
      const hasNewJourneyStage = newAccessData.journeyStage !== user.journeyStage;

      if (hasNewType || hasNewPermissions || hasNewCoach || hasNewJourneyStage) {
        if (
          data.type === UserType.CLIENT &&
          newAccessData.permissions?.includes(UserPermissions.CLIENT) &&
          data.coachUserId
        )
          newAccessData.coachUserId = data.coachUserId;

        await updateUserAccess(newAccessData);
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
              { label: upperFirst(UserType.ENQUIRER), value: UserType.ENQUIRER },
              { label: upperFirst(UserType.CLIENT), value: UserType.CLIENT },
              { label: upperFirst(UserType.COACH), value: UserType.COACH },
              { label: upperFirst(UserType.MANAGER), value: UserType.MANAGER },
            ]}
          />
          <SelectInput
            control={control}
            name="journeyStage"
            label="User Journey Stage"
            defaultValue={user.journeyStage}
            options={journeyStageList}
          />
          <SelectInput
            control={control}
            name="permissions"
            label="Permissions"
            multiple
            defaultValue={user.permissions}
            options={Object.keys(UserPermissions).map((perm) => ({
              label: upperFirst(startCase(perm).toLowerCase()),
              value: perm,
            }))}
          />
          {isClientOrEnquirer && coaches && (
            <CoachAutocomplete fieldName="coachUserId" client={user} />
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
