import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../../app/App";
import { NAV_MENU_TOGGLE_BTN_ID } from "../../components/AppHeader";
import { IUser } from "../../features/user/userModels";
import { TEST_PASSWORD } from "../../mocks/constants";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import { screen, render } from "../test-utils";

const manager = MOCK_MANAGERS[0];

const doLogin = async (email: string, password: string) => {
  userEvent.click(screen.getByRole("button", { name: /login/i }));
  await userEvent.type(screen.getByLabelText(/email/gi), email, { delay: 1 });
  await userEvent.type(screen.getByLabelText(/password/gi), password, { delay: 1 });
  userEvent.click(screen.getByRole("button", { name: /login/gi }));
  await screen.findByText(/coach list/i);
};

const doLogout = async (user: IUser) => {
  await doLogin(user.email, TEST_PASSWORD);
  const toggle = document.getElementById(NAV_MENU_TOGGLE_BTN_ID) as HTMLButtonElement;
  userEvent.click(toggle);
  userEvent.click(screen.getByText(/logout/i));
  await screen.findByRole("button", { name: /login/i });
};

describe("Login/logout", () => {
  beforeEach(() => render(<App />));
  test("login", async () => await doLogin(manager.email, TEST_PASSWORD));
  test("logout", async () => await doLogout(manager));
});
