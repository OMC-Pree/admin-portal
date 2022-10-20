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
import { EMAIL_VALIDATION_REGEX } from "../../../utils/inputValidationRegex";

interface ICreateUserFormInputsProps {
  control: Control;
  setValue: (key: string, value: string) => void;
  trigger: () => void;
  toBeClient: boolean;
  toBeCoach: boolean;
}

function CreateUserFormInputs({
  control,
  setValue,
  trigger,
  toBeClient = true,
  toBeCoach = false,
}: ICreateUserFormInputsProps) {
  const { isAdmin } = useAuth();
  const { coaches } = useCoaches();
  const { managers } = useManagers();

  if (!coaches) return null;
  return (
    <>
      <SelectInput
        sx={{ pt: 1 }}
        control={control}
        name="type"
        label="Type"
        onChange={(event) => {
          if (event.target.value === UserType.COACH) {
            setValue("coachUserId", "");
          } else if (event.target.value === UserType.CLIENT) {
            setValue("managerUserId", "");
          }
          trigger();
        }}
        options={generateTypeOptions(isAdmin)}
      />
      <TextInput
        control={control}
        type="email"
        name="email"
        label="Email"
        rules={{
          required: true,
          pattern: {
            value: EMAIL_VALIDATION_REGEX,
            message: "Entered value does not match email format",
          },
        }}
      />
      <TextInput control={control} name="firstName" label="First name" rules={{ required: true }} />
      <TextInput control={control} name="lastName" label="Last name" rules={{ required: true }} />
      <TextInput control={control} name="airTableId" label="AirTable ID" />
      {toBeClient ? (
        <SelectInput
          sx={{ pt: 1 }}
          control={control}
          name="coachUserId"
          label="Coach"
          rules={{ required: true }}
          disabled={toBeCoach}
          options={[{ value: "", label: "Choose a coach" }].concat(
            [...coaches].sort(sortUsersByKey("firstName")).map((coach) => ({
              label: `${coach.firstName} ${coach.lastName}`,
              value: coach.id,
            })),
          )}
        />
      ) : (
        <SelectInput
          sx={{ pt: 1 }}
          control={control}
          name="managerUserId"
          label="Manager"
          disabled={toBeClient}
          options={[{ value: "", label: "Choose a manager" }].concat(
            [...managers].sort(sortUsersByKey("firstName")).map((manager) => ({
              label: `${manager.firstName} ${manager.lastName}`,
              value: manager.id,
            })),
          )}
        />
      )}
      <CheckboxInput
        control={control}
        label="Send password creation email to new user"
        name="sendPasswordCreationEmail"
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
