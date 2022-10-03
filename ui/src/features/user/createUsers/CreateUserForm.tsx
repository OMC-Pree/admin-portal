import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { UserPermissions, UserType } from "../userEnums";
import { IUser } from "../user";
import { IDPNewUser } from "../../../models/httpCalls";
import { useBulkCreateUserMutation, useUpdateUserMutation } from "../../../api/users";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/store";
import { addCoaches } from "../../coaches/coachesSlice";
import { addManagers } from "../../managers/managersSlice";
import CreateUserFormInputs from "./CreateUserFormInputs";
import CreateUserConfirmModal from "./CreateUserConfirmModal";

const defaultValues: FieldValues = {
  email: "",
  firstName: "",
  lastName: "",
  managerUserId: "",
  coachUserId: "",
  type: UserType.CLIENT,
  associateUserId: "",
  airTableId: "",
  sendVerificationEmail: true,
};

function CreateUserForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createUsers] = useBulkCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [userToCreate, setUserToCreate] = useState<IDPNewUser>();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { isDirty, isValid, errors },
  } = useForm<FieldValues>({
    mode: "all",
    defaultValues,
  });

  const onSubmit = async (data: FieldValues) => {
    setSaveModalOpen(true);
    setUserToCreate(formatUserToCreate(data));
  };

  const doSave = async () => {
    if (!userToCreate) return;
    const userType = userToCreate.type;
    const { data: createdUserData } = await createUsers([userToCreate]).unwrap();
    let newUser = createdUserData[0];
    if (newUser) {
      const { data: updatedUserResult } = await updateUser(
        generateUserUpdateData(newUser, userType),
      ).unwrap();
      newUser = updatedUserResult[0];
      if (newUser.type === UserType.COACH) dispatch(addCoaches([newUser]));
      if (newUser.type === UserType.MANAGER) dispatch(addManagers([newUser]));
    }
    navigate(getUrlToNav(newUser.id, userType));
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <CreateUserFormInputs
            control={control}
            trigger={trigger}
            setValue={setValue}
            toBeClient={getValues("type") === UserType.CLIENT}
            toBeCoach={getValues("type") === UserType.COACH}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || Object.keys(errors).length > 0}
          >
            save
          </Button>
        </Stack>
      </Box>
      <CreateUserConfirmModal
        isOpen={saveModalOpen}
        close={() => setSaveModalOpen(false)}
        onSave={doSave}
      />
    </>
  );
}

export default CreateUserForm;

////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////

function formatUserToCreate(data: FieldValues) {
  const newUser: Partial<IDPNewUser> = {
    type: data.type,
    email: data.email.trim(),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    onCreateSendEmailHQToCoach: false,
    onCreateSendEmailHQToClient: false,
    onCreateSendEmailCoachToClient: false,
  };
  if (data.airTableId) newUser.airTableId = data.airTableId.trim();
  if (data.associateUserId) newUser.associateUserId = data.associateUserId.trim();
  if (data.coachUserId) newUser.coachUserId = data.coachUserId.trim();
  if (data.managerUserId) newUser.managerUserId = data.managerUserId.trim();
  if (data.sendPasswordCreationEmail && data.type === UserType.CLIENT) {
    newUser.onCreateSendEmailHQToClient = true;
  }
  if (
    data.sendPasswordCreationEmail &&
    (data.type === UserType.COACH || data.type === UserType.MANAGER)
  ) {
    newUser.onCreateSendEmailHQToCoach = true;
  }
  return newUser as IDPNewUser;
}

function generateUserUpdateData(createdUser: IUser, type: UserType) {
  const permissions: UserPermissions[] = [];
  if (type === UserType.COACH) permissions.push(UserPermissions.COACH);
  if (type === UserType.MANAGER) permissions.push(UserPermissions.MANAGER);
  if (type === UserType.CLIENT) permissions.push(UserPermissions.CLIENT);
  return {
    id: createdUser.id,
    type,
    permissions,
  };
}

function getUrlToNav(userId: string, type: UserType) {
  switch (type) {
    case UserType.COACH:
      return `/coaches/${userId}`;
    case UserType.CLIENT:
      return `/clients/${userId}`;
    default:
      return "/";
  }
}
