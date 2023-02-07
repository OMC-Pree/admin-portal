import { Button, Stack, Typography } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { createTwoFAFieldTemplate } from "../../../components/form/formFieldCreators";
import FormInputText from "../../../components/form/inputs/FormInputText";
import { COLOURS } from "../../../theme/colours";

export const TwoFAForm = ({
  onSubmit,
  isLoading,
  incorrect2faAuth,
}: {
  onSubmit: ({ email, password }: FieldValues) => Promise<void>;
  isLoading: boolean;
  incorrect2faAuth: boolean;
}): JSX.Element => {
  const {
    formState: { isDirty, isValid },
    handleSubmit,
    control,
  } = useFormContext();

  return (
    <Stack
      component="form"
      direction="column"
      alignItems="flex-start"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{
        px: 5,
        mb: 5,
      }}
    >
      <Stack
        data-testid="2fa-page"
        component="div"
        direction="column"
        spacing={2}
        sx={{ mb: "32px", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ color: COLOURS.INDIGO[600] }}>
          {!incorrect2faAuth
            ? `We’ve sent a 6-digit code to the email address you used to log in. Copy and paste the code into the box below.`
            : `We’ve sent a new code to your email. Copy and paste the new code into the box below.`}
        </Typography>
        <FormInputText
          control={control}
          defaultValue=""
          {...createTwoFAFieldTemplate({ placeholder: "" })}
        />
        {isLoading && <Typography variant="body1">Logging in...</Typography>}
      </Stack>
      <Stack sx={{ alignItems: "center", width: 1 }}>
        <Button
          sx={{ width: 240 }}
          variant="contained"
          type="submit"
          size="large"
          disabled={!isValid || !isDirty}
        >
          CONTINUE
        </Button>
      </Stack>
    </Stack>
  );
};
