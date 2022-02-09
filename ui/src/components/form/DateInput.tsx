import React from "react";
import { Control, Controller } from "react-hook-form";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { TextField } from "@mui/material";

interface IDateInputProps {
  control: Control;
  name: string;
  label: string;
  size?: "small" | "medium";
  required?: boolean;
}
const DateInput = ({ control, label, name, size = "small", required }: IDateInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: required }}
    render={({ field, fieldState: { error } }) => (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
        <DesktopDatePicker
          label={label}
          {...field}
          renderInput={(params) => <TextField size={size} error={!!error} fullWidth {...params} />}
        />
      </LocalizationProvider>
    )}
  />
);

export default DateInput;
