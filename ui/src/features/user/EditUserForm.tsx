import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import TextInput from "../../components/form/TextInput";
import { IUser } from "./user";
// import DateInput from "../../components/form/DateInput";
// import { format } from "date-fns";
import SelectInput from "../../components/form/SelectInput";
import { UserPermissions, UserType } from "./userEnums";
import { noop, startCase, upperFirst } from "lodash";
import { useUpdateUserMutation } from "../../api/users";
import { useAppDispatch } from "../../hooks/store";
import { updateStoredCoach } from "../coaches/coachesSlice";

interface IEditUserFormProps {
  user: IUser;
  onSuccess: () => void;
  onCancel?: () => void;
}

function EditUserForm({ user, onSuccess, onCancel = noop }: IEditUserFormProps) {
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      // dateOfBirth: user.dateOfBirth,
      type: user.type,
      permissions: user.permissions || [],
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const newData = {
      ...data,
      // dateOfBirth: format(new Date(data.dateOfBirth), "yyyy-MM-dd"),
      id: user.id,
    };
    await updateUser(newData).unwrap();
    if (user.type === UserType.COACH) dispatch(updateStoredCoach(newData));
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextInput control={control} name="firstName" label="First name" required />
        <TextInput control={control} name="lastName" label="Last name" required />
        {/* <DateInput control={control} name="dateOfBirth" label="Date of birth" required /> */}
        <SelectInput
          control={control}
          name="type"
          label="Type"
          options={[
            { label: upperFirst(UserType.COACH), value: UserType.COACH },
            { label: upperFirst(UserType.CLIENT), value: UserType.CLIENT },
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
  );
}

export default EditUserForm;
