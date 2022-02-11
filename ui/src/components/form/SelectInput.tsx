import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SxProps,
  Theme,
} from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface ISelectOption {
  label: string;
  value: string | number;
}

interface ISelectInputProps extends SelectProps {
  control: Control;
  name: string;
  label: string;
  options: ISelectOption[];
  rules?: RegisterOptions;
  sx?: SxProps<Theme>;
}
const SelectInput = ({
  label,
  options = [],
  multiple = false,
  disabled,
  size,
  sx,
  ...rest
}: ISelectInputProps) => (
  <Box sx={sx}>
    <Controller
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            variant="outlined"
            label={label}
            {...field}
            multiple={multiple}
            disabled={disabled}
            size={size}
            error={!!error}
          >
            {options.map(({ label: optLabel, value }) => (
              <MenuItem key={`select-option${value}`} value={value}>
                {optLabel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  </Box>
);

export default SelectInput;
