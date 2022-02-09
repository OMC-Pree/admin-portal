import React from "react";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface ITextInputProps {
  control: Control;
  name: string;
  label: string;
  size?: "small" | "medium";
  required?: boolean;
}
const TextInput = ({
  control,
  label,
  name,
  size = "small",
  required = false,
  ...rest
}: ITextInputProps) => (
  <Controller
    {...rest}
    rules={{
      required: required,
    }}
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField size={size} label={label} {...field} error={!!error} fullWidth />
    )}
  />
);

export default TextInput;
