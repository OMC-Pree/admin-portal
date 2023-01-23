import { InputProps, TextField } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface TextInputProps extends InputProps {
  control: Control;
  name: string;
  label: string;
  rules?: RegisterOptions;
}
const TextInput = ({ label, type = "text", size = "small", ...rest }: TextInputProps) => (
  <Controller
    {...rest}
    render={({ field, fieldState: { error } }) => (
      <TextField type={type} size={size} label={label} {...field} error={!!error} fullWidth />
    )}
  />
);

export default TextInput;
