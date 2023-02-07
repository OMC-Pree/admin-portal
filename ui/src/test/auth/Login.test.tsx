import { waitFor } from "@testing-library/dom";
import App from "../../app/App";
import userEvent from "@testing-library/user-event";
import { UserPermissions } from "../../features/user/userEnums";
import { IUser } from "../../features/user/userModels";
import { TEST_2FA, TEST_PASSWORD } from "../../mocks/constants";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import { render, screen } from "../test-utils";

describe("Login", () => {
  const manager = MOCK_MANAGERS[0];

  const managerAndAbovePermissions = [UserPermissions.ADMIN, UserPermissions.MANAGER];

  beforeEach(() => render(<App />));

  const do2FALogin = async (TwoFA: string) => {
    await userEvent.type(screen.getByTestId(/input-email2FACode/i), TwoFA, { delay: 1 });
    userEvent.click(screen.getByRole("button", { name: /Continue/i }));
  };

  const doLogin = async (email: string, password: string, twoFA?: string) => {
    userEvent.click(screen.getByRole("button", { name: /Login/i }));
    await userEvent.type(screen.getByLabelText(/email/i), email, { delay: 1 });
    await userEvent.type(screen.getByLabelText(/password/i), password, { delay: 1 });
    userEvent.click(screen.getByRole("button", { name: /Continue/i }));
    if (twoFA) {
      await waitFor(() => screen.getByTestId("2fa-page"));
      do2FALogin(twoFA);
    }
  };

  const doLogout = async (user: IUser) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const userIsCoachOrAbove =
      user?.permissions && managerAndAbovePermissions.includes(user?.permissions[0]);
    userIsCoachOrAbove
      ? await doLogin(user.email, TEST_PASSWORD, TEST_2FA) // 200
      : await doLogin(user.email, TEST_PASSWORD); //
    await waitFor(() => screen.getByText(fullName));
    userEvent.click(screen.getByRole("button", { name: fullName }));
    userEvent.click(screen.getByText(/logout/i));
    await screen.findByRole("button", { name: /Continue/i });
  };

  describe("bad input data", () => {
    test("incorrect login username", async () => {
      await doLogin("bad@username.com", TEST_PASSWORD);
      await waitFor(() => screen.getByText("Email or password is incorrect"));
    });
    test("incorrect login password", async () => {
      await doLogin(manager.email, "bad password");
      await waitFor(() => screen.getByText("Email or password is incorrect"));
    });

    test("incorrect or expired 2FA for manager or above", async () => {
      await doLogin(manager.email, TEST_PASSWORD, "666666");
      await waitFor(() => screen.getByText("Incorrect or expired 2FA code"));
    });
  });

  describe("manager login/logout", () => {
    test("login", async () => {
      await doLogin(manager.email, TEST_PASSWORD);
      await waitFor(() => screen.getByTestId("2fa-page"));
      do2FALogin(TEST_2FA);
      await waitFor(() => screen.getByTestId("nav-menu-toggle"));
    });

    test("logout", async () => await doLogout(manager));
  });
});
