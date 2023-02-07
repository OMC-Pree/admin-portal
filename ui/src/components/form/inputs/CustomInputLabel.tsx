import { InputLabel } from "@mui/material";
import { COLOURS } from "../../../theme/colours";

interface CustomInputLabelProps {
  text: string | undefined;
  name: string;
  required?: boolean;
  color?: string;
  size?: number;
  hoverColor?: string;
  focusColor?: string;
  hasFocus?: boolean;
  hasError?: boolean;
  hasHover?: boolean;
  disabled?: boolean;
  wrapLabel?: boolean;
}

const CustomInputLabel = ({
  text,
  name,
  required,
  color,
  size,
  hoverColor,
  focusColor,
  wrapLabel = false,
  hasFocus = false,
  hasError = false,
  hasHover = false,
  disabled = false,
}: CustomInputLabelProps): JSX.Element | null =>
  text ? (
    <InputLabel
      error={hasError}
      focused={hasFocus}
      htmlFor={name}
      disabled={disabled}
      required={required}
      sx={{
        color: color ? color : hasHover ? hoverColor || COLOURS.GREY[800] : undefined,
        whiteSpace: wrapLabel ? "normal" : "nowrap",
        "&.Mui-focused": {
          color: focusColor ? focusColor : COLOURS.GREY[800],
        },
        fontSize: size ? size : 16,
      }}
    >
      {text}
    </InputLabel>
  ) : null;

export default CustomInputLabel;
