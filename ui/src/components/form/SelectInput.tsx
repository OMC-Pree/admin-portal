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
  name,
  label,
  options = [],
  multiple = false,
  disabled,
  size,
  sx,
  onChange,
  ...rest
}: ISelectInputProps) => (
  <Box sx={sx}>
    <Controller
      {...rest}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            id={`${name}-select`}
            variant="outlined"
            label={`${label}-select`}
            aria-labelledby={`${label}-select-label`}
            {...field}
            multiple={multiple}
            disabled={disabled}
            size={size}
            error={!!error}
            onChange={(event, child) => {
              onChange?.(event, child);
              field.onChange(event, child);
            }}
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
