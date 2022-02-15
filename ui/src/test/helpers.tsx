import React from "react";
import { RenderResult } from "@testing-library/react";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "./test-utils";
import { IUser } from "../features/user/user";
import App from "../app/App";
import userEvent from "@testing-library/user-event";

export const login = (preloadedState = {}, route?: string): RenderResult =>
  render(<App />, { preloadedState }, route);

export const tokenForUser = (user: IUser): string => `token-for-${user.id}`;

export const loginAsUser = async (user: IUser): Promise<RenderResult> => {
  const rendered = login({ auth: { token: tokenForUser(user), user } });
  return rendered;
};

export const getSelect = (id: string) => document.querySelector(id) as HTMLInputElement;

export const selectOption = async (
  select: HTMLInputElement,
  optionText: string,
  isMultiple = false,
) => {
  fireEvent.mouseDown(select);
  const optionToSelect = await screen.findByRole("option", {
    name: optionText,
  });
  userEvent.click(optionToSelect);
  if (!isMultiple) {
    await waitForElementToBeRemoved(optionToSelect);
  }
};
