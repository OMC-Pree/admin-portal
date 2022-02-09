import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface ISelectOption {
  label: string;
  value: string | number;
}

interface ISelectInputProps {
  control: Control;
  name: string;
  label: string;
  options: ISelectOption[];
  multiple?: boolean;
}
const SelectInput = ({
  control,
  label,
  name,
  options = [],
  multiple = false,
}: ISelectInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select label={label} {...field} multiple={multiple}>
          {options.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);

export default SelectInput;
