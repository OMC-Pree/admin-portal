import { Button, Stack, Typography } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import {
  createEmailFieldTemplate,
  createPasswordFieldTemplate,
} from "../../../components/form/formFieldCreators";
import FormInputText from "../../../components/form/inputs/FormInputText";

export const EmailPasswordForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: ({ email, password }: FieldValues) => Promise<void>;
  isLoading: boolean;
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
        width: "400px",
      }}
    >
      <FormInputText
        control={control}
        defaultValue=""
        {...createEmailFieldTemplate({ placeholder: "Enter your email" })}
        fullWidth={true}
        labelSize={14}
      />
      <FormInputText
        control={control}
        defaultValue=""
        {...createPasswordFieldTemplate({
          shouldValidate: false,
          requiredMessage: "Please enter your password",
          placeholder: "Enter your password",
        })}
        fullWidth={true}
        labelSize={14}
      />
      {isLoading && <Typography variant="body1">Logging in...</Typography>}
      <Stack sx={{ width: 1, alignItems: "center" }}>
        <Button
          variant="contained"
          type="submit"
          size="large"
          disabled={!isValid || !isDirty}
          sx={{ width: 120 }}
        >
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};
