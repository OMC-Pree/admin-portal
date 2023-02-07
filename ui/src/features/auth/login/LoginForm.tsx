import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useLazyDecryptTokenQuery, useLogin2FAMutation } from "../../../api/auth";
import { useAppDispatch } from "../../../hooks/store";
import { IdpErrorResponse } from "../../../models/httpCalls";
import { EmailPasswordForm } from "./EmailPasswordForm";
import { TwoFAForm } from "./TwoFAForm";
import { setToken } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { UserPermissions } from "../../user/userEnums";
import { ErrorMessage } from "../../../components/form/FormInputs";
export const LoginForm = ({
  setNeed2faAuth,
  need2faAuth,
  setIncorrect2faAuth,
  incorrect2faAuth,
}: {
  setNeed2faAuth: Dispatch<SetStateAction<boolean>>;
  need2faAuth: boolean;
  setIncorrect2faAuth: Dispatch<SetStateAction<boolean>>;
  incorrect2faAuth: boolean;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [login2FA, { isLoading }] = useLogin2FAMutation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [decryptToken] = useLazyDecryptTokenQuery();
  const [accessMessage, setAccessMessage] = useState("");
  const navigate = useNavigate();

  const useFormReturn = useForm<FieldValues>({ mode: "onChange" });
  const { setError } = useFormReturn;

  const onLoginPasswordSubmit = async ({ email, password }: FieldValues) => {
    try {
      setAccessMessage("");
      setEmail(email);
      setPassword(password);
      const tokenData = await login2FA({ email, password }).unwrap();
      const decryptedToken = await decryptToken(tokenData.encryptedJWTToken).unwrap();
      const {
        identityUser: { permissions },
      } = decryptedToken;
      const hasPermission =
        permissions.includes(UserPermissions.ADMIN) ||
        permissions.includes(UserPermissions.MANAGER);
      if (!hasPermission) {
        // Admin-portal can only be accessed by user with either a Manager and a Admin permission.
        const err = new Error("unauthorised") as unknown as IdpErrorResponse;
        err.status = 200;
        throw err;
      }
      dispatch(setToken(tokenData));
    } catch (err: unknown) {
      if ((err as IdpErrorResponse)?.status) {
        if ((err as IdpErrorResponse)?.status === 401) {
          setError("email", { type: "manual" });
          setError("password", { type: "manual", message: "Email or password is incorrect" });
        }
        if ((err as IdpErrorResponse)?.status === 428) {
          setNeed2faAuth(true);
        }
        if ((err as IdpErrorResponse)?.status === 200) {
          setAccessMessage("You do not have access");
        }
      }
    }
  };

  const on2FASubmit = async ({ email2FACode }: FieldValues) => {
    try {
      const tokenData = await login2FA({ email, password, email2FACode }).unwrap();
      dispatch(setToken(tokenData));
      setIncorrect2faAuth(false);
      // if logged in successfully, by default navigate to /coaches route.
      navigate("/coaches");
    } catch (err: unknown) {
      if ((err as IdpErrorResponse)?.status && (err as IdpErrorResponse)?.status === 428) {
        setError("email2FACode", { type: "manual", message: "Incorrect or expired 2FA code" });
        setIncorrect2faAuth(true);
      }
    }
  };

  return (
    <FormProvider {...useFormReturn}>
      {!need2faAuth && <EmailPasswordForm onSubmit={onLoginPasswordSubmit} isLoading={isLoading} />}
      {need2faAuth && (
        <TwoFAForm
          onSubmit={on2FASubmit}
          isLoading={isLoading}
          incorrect2faAuth={incorrect2faAuth}
        />
      )}
      {accessMessage && <ErrorMessage message={accessMessage} />}
    </FormProvider>
  );
};

export default LoginForm;
