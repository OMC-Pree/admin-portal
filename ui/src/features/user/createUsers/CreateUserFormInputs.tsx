import React from "react";
import TextInput from "../../../components/form/TextInput";
import SelectInput from "../../../components/form/SelectInput";
import CheckboxInput from "../../../components/form/CheckboxInput";
import { sortUsersByKey } from "../userSorters";
import { Control } from "react-hook-form";
import { upperFirst } from "lodash";
import { UserType } from "../userEnums";
import useCoaches from "../../coaches/useCoaches";
import useManagers from "../../managers/useManagers";
import useAuth from "../../auth/useAuth";

interface ICreateUserFormInputsProps {
  control: Control;
  toBeClient: boolean;
  toBeCoach: boolean;
}

function CreateUserFormInputs({
  control,
  toBeClient = true,
  toBeCoach = false,
}: ICreateUserFormInputsProps) {
  const { isAdmin } = useAuth();
  const { coaches } = useCoaches();
  const { managers } = useManagers();
  if (!coaches) return null;
  return (
    <>
      <TextInput
        control={control}
        type="email"
        name="email"
        label="Email"
        rules={{ required: true }}
      />
      <TextInput control={control} name="firstName" label="First name" rules={{ required: true }} />
      <TextInput control={control} name="lastName" label="Last name" rules={{ required: true }} />
      <TextInput control={control} name="airTableId" label="AirTable ID" />
      <SelectInput
        sx={{ pt: 1 }}
        control={control}
        name="type"
        label="Type"
        options={generateTypeOptions(isAdmin)}
      />
      <SelectInput
        sx={{ pt: 1 }}
        control={control}
        name="coachUserId"
        label="Coach"
        rules={{ required: toBeClient }}
        disabled={toBeCoach}
        options={[{ value: "", label: "Choose a coach" }].concat(
          [...coaches].sort(sortUsersByKey("firstName")).map((coach) => ({
            label: `${coach.firstName} ${coach.lastName}`,
            value: coach.id,
          })),
        )}
      />
      <SelectInput
        sx={{ pt: 1 }}
        control={control}
        name="managerUserId"
        label="Manager"
        // rules={{ required: toBeCoach }}
        disabled={toBeClient}
        options={[{ value: "", label: "Choose a manager" }].concat(
          [...managers].sort(sortUsersByKey("firstName")).map((manager) => ({
            label: `${manager.firstName} ${manager.lastName}`,
            value: manager.id,
          })),
        )}
      />
      <CheckboxInput
        control={control}
        label="Send Verification Email to user"
        name="sendVerificationEmail"
      />
    </>
  );
}

export default CreateUserFormInputs;

////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////

function generateTypeOptions(isAdmin: boolean) {
  const ret = [
    { label: upperFirst(UserType.CLIENT), value: UserType.CLIENT },
    { label: upperFirst(UserType.COACH), value: UserType.COACH },
  ];
  if (isAdmin) ret.push({ label: upperFirst(UserType.MANAGER), value: UserType.MANAGER });
  return ret;
}
