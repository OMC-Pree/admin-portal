import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Checkbox, FormControlLabel, FormHelperText, Stack } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { COLOURS } from "../../theme/colours";

export type FormInputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "select"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type SetValueAs = (
  previousValue: string | number | Date | boolean | undefined,
  newValue: string | number | Date | boolean | undefined,
) => string | number | Date | boolean | undefined;
export interface FormInputProps {
  name: string;
  control: Control;
  label?: string;
  labelSize?: number;
  labelColor?: string;
  hoverLabelColor?: string;
  focusLabelColor?: string;
  wrapLabel?: boolean;
  backgroundColor?: string;
  placeholder?: string;
  helperText?: string;
  helperTextColor?: string;
  helperTextPosition?: "top" | "bottom";
  helperTextSize?: number;
  defaultValue?: string | number | Date | boolean | undefined;
  options?: Array<Record<string, string>>;
  type?: FormInputType;
  rules?: RegisterOptions;
  prefix?: boolean | string | JSX.Element;
  onPrefixClick?: () => void;
  suffix?: boolean | string | JSX.Element;
  onSuffixClick?: () => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  checked?: boolean;
  width?: string | number;
  fullWidth?: boolean;
  showInnerBorder?: boolean;
  shouldUnregister?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
  setValueAs?: SetValueAs;
  tooltipText?: string;
  inputTextAlign?: "center" | "left" | "right";
  multiline?: boolean;
  rows?: number;
}

export interface FormInputCheckboxProps extends FormInputProps {
  checkboxColor?: string;
}

export const ErrorMessage = ({ message }: { message: string | undefined }): JSX.Element | null => {
  const iconStyle = { fill: COLOURS.RED, color: COLOURS.BACKGROUND.default, width: 24 };
  return message ? (
    <Stack direction="row" spacing={0.5} alignItems={"center"}>
      <ExclamationCircleIcon style={iconStyle} />
      <FormHelperText sx={{ fontSize: 14 }} error={!!message}>
        {message}
      </FormHelperText>
    </Stack>
  ) : null;
};

export const FormInputCheckbox = ({
  name,
  label = "",
  labelColor,
  checkboxColor,
  ...rest
}: FormInputCheckboxProps): JSX.Element => (
  <Controller
    name={name}
    {...rest}
    render={({ field }) => {
      const checked = typeof field.value === "string" ? field.value === "true" : field.value;
      return (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={checked}
              sx={{ color: checkboxColor, "&.Mui-checked": { color: checkboxColor } }}
            />
          }
          componentsProps={{
            typography: { color: labelColor },
          }}
          label={label}
        />
      );
    }}
  />
);
