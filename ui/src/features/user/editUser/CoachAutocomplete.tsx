import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useFormContext, useController, useForm } from "react-hook-form";
import { IUser } from "../user";
import useCoaches from "../../coaches/useCoaches";

const getCoach = (
  id: IUser["id"] | undefined,
  options: {
    label: string;
    id: string;
  }[],
) => options.find((coach) => coach.id === id);

interface CoachAutoCompleteProps {
  fieldName: string;
  client: IUser;
}

interface AutoCompleteCoach {
  label: string;
  id: string;
}

function CoachAutocomplete({ fieldName, client }: CoachAutoCompleteProps) {
  const { control: parentControl, setValue } = useFormContext();
  const { coachOptions } = useCoaches();
  const formMethods = useForm({ mode: "onChange", defaultValues: { coachName: "" } });
  const [selectedCoach, setSelectedCoach] = useState<AutoCompleteCoach | null>(null);

  // Controller for local form handling autocomplete text input
  const { field } = useController({
    control: formMethods.control,
    name: "coachName",
    defaultValue: "",
    rules: { required: true },
  });

  // Controller for the value on the parent form.
  useController({
    control: parentControl,
    name: fieldName,
    defaultValue: client.coachUserId,
    rules: {
      required: true,
    },
  });

  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: AutoCompleteCoach | null) => {
      setValue(fieldName, value?.id, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setSelectedCoach(value);
    },
    [client, coachOptions],
  );

  const initialiseSelectedCoach = useCallback(() => {
    const currentCoach = getCoach(client.coachUserId, coachOptions);
    if (currentCoach) {
      setSelectedCoach(currentCoach);
      setValue(fieldName, currentCoach.id, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [client, coachOptions]);

  useEffect(() => {
    if (coachOptions.length && client.coachUserId) initialiseSelectedCoach();
  }, [coachOptions]);

  return (
    <Autocomplete
      options={coachOptions}
      value={selectedCoach}
      onChange={handleChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} {...field} label="Assigned Coach" />}
    />
  );
}

export default CoachAutocomplete;
