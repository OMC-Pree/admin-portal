import { screen, waitForElementToBeRemoved } from "../test-utils";
import { getSelect, loginAsUser, selectOption } from "../helpers";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import userEvent from "@testing-library/user-event";
import { UserType } from "../../features/user/userEnums";
import { MOCK_COACHES } from "../../mocks/data/mockCoaches";
import { FieldValues } from "react-hook-form";
import { upperFirst } from "lodash";

const manager = MOCK_MANAGERS[0];
const coach = MOCK_COACHES[0];

const newUser: FieldValues = {
  email: "test-email@email.com",
  firstName: "Tester",
  lastName: "McTesterson",
  managerUserId: "",
  coachUserId: "",
  type: UserType.CLIENT,
  associateUserId: "",
  airTableId: "",
  sendPasswordCreationEmail: true,
};

const completeForm = async (userData: FieldValues) => {
  const { email, firstName, lastName, type, coachUserId, managerUserId } = userData;
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
  const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
  const typeSelect = getSelect("#type-select");
  const saveBtn = screen.getByRole("button", { name: /save/i });

  expect(saveBtn).toBeDisabled();

  await selectOption(typeSelect, upperFirst(type));
  await userEvent.type(emailInput, email, { delay: 1 });
  await userEvent.type(firstNameInput, firstName, { delay: 1 });
  await userEvent.type(lastNameInput, lastName, { delay: 1 });

  if (type === UserType.CLIENT && coachUserId) {
    const coach = MOCK_COACHES.find((c) => c.id === coachUserId);
    const coachSelect = getSelect("#coachUserId-select");
    await selectOption(coachSelect, `${coach?.firstName} ${coach?.lastName}`);
    expect(coachSelect.textContent).toEqual(`${coach?.firstName} ${coach?.lastName}`);
  }

  if (type === UserType.COACH && managerUserId) {
    const manager = MOCK_MANAGERS.find((m) => m.id === managerUserId);
    const managerSelect = getSelect("#managerUserId-select");
    await selectOption(managerSelect, `${manager?.firstName} ${manager?.lastName}`);
    expect(managerSelect.textContent).toEqual(`${manager?.firstName} ${manager?.lastName}`);
  }

  expect(saveBtn).not.toBeDisabled();
  userEvent.click(saveBtn);
  const modalTitle = await screen.findByText("Are you sure you want to create the user?");
  userEvent.click(screen.getByRole("button", { name: /yes/i }));
  await waitForElementToBeRemoved(modalTitle);
  expect(await screen.findByText(/personal information/i)).toBeInTheDocument();
};

describe("Single user creation", () => {
  beforeEach(async () => {
    loginAsUser(manager);
    userEvent.click(await screen.findByRole("button", { name: /new user/i }));
  });

  test("client creation", async () => {
    await completeForm({ ...newUser, type: UserType.CLIENT, coachUserId: coach.id });
  });

  test("coach creation", async () => {
    await completeForm({ ...newUser, type: UserType.COACH, managerUserId: manager.id });
  });
});
