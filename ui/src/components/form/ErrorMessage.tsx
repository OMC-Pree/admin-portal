import { FormHelperText, Stack } from "@mui/material";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface ErrorMessageProps {
  message: string | undefined;
}

export const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element | null => {
  const iconStyle = { fill: "red", color: "white", width: 24 };
  return message ? (
    <Stack direction="row" spacing={0.5} alignItems={"center"}>
      <ExclamationCircleIcon style={iconStyle} />
      <FormHelperText sx={{ fontSize: 14 }} error={!!message}>
        {message}
      </FormHelperText>
    </Stack>
  ) : null;
};
