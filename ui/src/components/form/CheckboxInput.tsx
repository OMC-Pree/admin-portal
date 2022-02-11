import React from "react";
import {
  Box,
  FormControl,
  Checkbox,
  CheckboxProps,
  SxProps,
  Theme,
  FormControlLabel,
} from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface ICheckboxInputProps extends CheckboxProps {
  control: Control;
  name: string;
  label: string;
  rules?: RegisterOptions;
  sx?: SxProps<Theme>;
}
const CheckboxInput = ({
  control,
  label,
  name,
  disabled,
  size,
  sx,
  ...rest
}: ICheckboxInputProps) => (
  <Box sx={sx}>
    <Controller
      {...rest}
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <FormControlLabel
            label={label}
            disabled={disabled}
            control={<Checkbox {...field} size={size} checked={field.value} />}
          />
        </FormControl>
      )}
    />
  </Box>
);

export default CheckboxInput;
