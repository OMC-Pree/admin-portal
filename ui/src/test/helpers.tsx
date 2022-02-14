import React from "react";
import { RenderResult } from "@testing-library/react";
import { render } from "./test-utils";
import { IUser } from "../features/user/user";
import App from "../app/App";

export const login = (preloadedState = {}, route?: string): RenderResult =>
  render(<App />, { preloadedState }, route);

export const tokenForUser = (user: IUser): string => `token-for-${user.id}`;

export const loginAsUser = async (user: IUser): Promise<RenderResult> => {
  const rendered = login({ auth: { token: tokenForUser(user), user } });
  return rendered;
};
