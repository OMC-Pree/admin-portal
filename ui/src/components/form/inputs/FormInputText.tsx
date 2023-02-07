import InfoIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { Stack, TextField, Tooltip, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import CustomInputLabel from "./CustomInputLabel";
import { COLOURS } from "../../../theme/colours";
import { convertToNumber } from "../../../utils/formUtils";
import { ErrorMessage, FormInputProps } from "../FormInputs";
import { IS_DECIMAL_REGEX } from "../../../utils/inputValidationRegex";

const Adornment = ({
  item,
  disabled = false,
  onClick,
}: {
  item: string | boolean | JSX.Element | undefined;
  type: "prefix" | "suffix";
  disabled: boolean | undefined;
  onClick?: () => void;
}): JSX.Element | null =>
  item ? (
    <Stack
      alignItems="center"
      justifyContent="center"
      flex={1}
      sx={{
        color: disabled ? COLOURS.GREY[300] : COLOURS.WHITE,
        margin: 0,
        paddingX: onClick ? 1.25 : 2,
        fontSize: 18,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {item}
    </Stack>
  ) : null;

const InputWrapper = ({
  hasError,
  hasFocus,
  disabled,
  backgroundColor = COLOURS.INDIGO[600],
  children,
}: {
  hasError: boolean;
  hasFocus: boolean;
  disabled: boolean | undefined;
  backgroundColor?: string;
  children: JSX.Element[];
}): JSX.Element => (
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      backgroundColor: disabled ? COLOURS.GREY[100] : backgroundColor,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: disabled
        ? COLOURS.GREY[300]
        : hasError
        ? COLOURS.RED
        : hasFocus
        ? COLOURS.INDIGO[500]
        : COLOURS.GREY[600],
      borderRadius: 1,
      padding: 0,
      "&:hover": {
        borderColor: hasError ? COLOURS.RED : disabled ? "COLOURS.GREY[300]" : COLOURS.INDIGO[500],
      },
    }}
  >
    {children}
  </Stack>
);

const FormInputText = ({
  name,
  label,
  labelColor,
  labelSize,
  hoverLabelColor,
  focusLabelColor,
  placeholder,
  helperText,
  helperTextPosition = "bottom",
  helperTextSize,
  prefix,
  onPrefixClick,
  suffix,
  onSuffixClick,
  type,
  disabled,
  wrapLabel,
  backgroundColor,
  setValueAs,
  width = "100%",
  fullWidth = false,
  shouldUnregister = true,
  tooltipText: tooltip,
  onChange,
  rules,
  inputTextAlign = type === "number" ? "right" : "left",
  multiline,
  rows,
  ...rest
}: FormInputProps): JSX.Element => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [inputValue, setInputValue] = useState<
    | string
    | number
    | boolean
    | Date
    | undefined
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  >("");
  return (
    <Controller
      {...rest}
      rules={rules}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{ width: fullWidth ? "100%" : undefined }}>
          <Stack direction="row" alignItems="flex-start" gap={0.5}>
            <CustomInputLabel
              text={label}
              name={name}
              hasFocus={hasFocus}
              hasError={!!error}
              hasHover={hasHover}
              disabled={disabled}
              wrapLabel={wrapLabel}
              size={labelSize}
              color={labelColor}
              hoverColor={hoverLabelColor}
              focusColor={focusLabelColor}
              required={(rules?.required?.valueOf() as { message: string; value: boolean })?.value}
            />
            {tooltip && (
              <Tooltip title={tooltip} placement="right">
                <InfoIcon color={COLOURS.GREY[800]} style={{ minWidth: 20, width: 20 }} />
              </Tooltip>
            )}
          </Stack>
          <ErrorMessage message={error?.message} />
          {helperText && helperTextPosition === "top" && (
            <Typography
              variant="subtitle1"
              sx={{
                color: COLOURS.GREY[600],
                mt: "4px",
                mb: "4px",
                ...(!!helperTextSize && { fontSize: helperTextSize }),
              }}
            >
              {helperText}
            </Typography>
          )}
          <Stack sx={{ width: fullWidth ? "100%" : width }}>
            <InputWrapper
              hasFocus={hasFocus}
              hasError={!!error}
              disabled={disabled}
              backgroundColor={backgroundColor}
            >
              <Adornment item={prefix} type="prefix" disabled={disabled} onClick={onPrefixClick} />
              <TextField
                {...field}
                id={name}
                onMouseOver={() => setHasHover(true)}
                onMouseOut={() => setHasHover(false)}
                onFocus={() => setHasFocus(true)}
                onBlur={() => {
                  field.onBlur();
                  setHasFocus(false);
                }}
                onChange={(e) => {
                  const isDecimal = IS_DECIMAL_REGEX.test(e.target.value);
                  if (type === "number" && !isDecimal && e.target.value !== "") {
                    e.target.value = convertToNumber(field.value, e.target.value) as string;
                  }
                  onChange?.(e);
                  const newValue =
                    e.target.value !== "" && setValueAs
                      ? setValueAs(field.value, e.target.value)
                      : type === "number" && !isDecimal && e.target.value !== ""
                      ? convertToNumber(field.value, e.target.value)
                      : e.target.value;
                  setInputValue(newValue);
                  field.onChange(newValue);
                }}
                value={
                  type === "number" && field.value !== undefined
                    ? !field.value
                      ? inputValue
                      : field.value.toLocaleString("en-US")
                    : field.value
                }
                type={type === "number" ? "text" : type}
                error={!!error}
                disabled={disabled}
                variant="standard"
                margin="none"
                fullWidth={true}
                inputProps={{
                  "data-testid": `input-${name}`,
                  style: { textAlign: inputTextAlign },
                }}
                InputProps={{
                  placeholder,
                  disableUnderline: true,
                  sx: {
                    border: 0,
                    borderTopLeftRadius: prefix ? 0 : 2,
                    borderBottomLeftRadius: prefix ? 0 : 2,
                    borderTopRightRadius: suffix ? 0 : 2,
                    borderBottomRightRadius: suffix ? 0 : 2,
                    backgroundColor: COLOURS.WHITE,
                  },
                }}
                sx={{ padding: 0, border: 0 }}
                multiline={multiline}
                rows={rows}
              />
              <Adornment item={suffix} type="suffix" disabled={disabled} onClick={onSuffixClick} />
            </InputWrapper>
          </Stack>
          {helperText && helperTextPosition === "bottom" && (
            <Typography
              variant="subtitle1"
              sx={{
                color: COLOURS.GREY[600],
                mt: "4px",
                mb: "4px",
                ...(!!helperTextSize && { fontSize: helperTextSize }),
              }}
            >
              {helperText}
            </Typography>
          )}
        </Stack>
      )}
    />
  );
};

export default FormInputText;
