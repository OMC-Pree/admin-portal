import React from "react";
import { render, screen } from "./test-utils";
import App from "../app/App";

test("renders login button", async () => {
  render(<App />);
  const emailInput = screen.getByRole("button", { name: /login/i });
  expect(emailInput).toBeInTheDocument();
});
