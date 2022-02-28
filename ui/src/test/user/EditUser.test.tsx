import { screen, waitForElementToBeRemoved } from "../test-utils";
import { getSelect, loginAsUser, selectOption } from "../helpers";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import userEvent from "@testing-library/user-event";
import { UserType } from "../../features/user/userEnums";
import { MOCK_COACHES } from "../../mocks/data/mockCoaches";
import { upperFirst } from "lodash";

const manager = MOCK_MANAGERS[0];
const coach = MOCK_COACHES[0];

describe("Edit user", () => {
  beforeEach(async () => {
    loginAsUser(manager);
    userEvent.click(await screen.findByRole("cell", { name: coach.id }));
    userEvent.click(await screen.findByRole("button", { name: /edit/i }));
    await screen.findByRole("textbox", { name: /first name/i });
  });

  test("form submission", async () => {
    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    const typeSelect = getSelect("#type-select");
    const permissionsSelect = getSelect("#permissions-select");
    const saveBtn = screen.getByRole("button", { name: /save/i });

    await userEvent.type(firstNameInput, "newFirstName", { delay: 1 });
    await userEvent.type(lastNameInput, "newLastName", { delay: 1 });
    await selectOption(typeSelect, upperFirst(UserType.MANAGER));
    await selectOption(permissionsSelect, upperFirst(UserType.COACH), true);
    await selectOption(permissionsSelect, upperFirst(UserType.MANAGER), true);
    userEvent.click(permissionsSelect);
    userEvent.click(saveBtn);
    await waitForElementToBeRemoved(firstNameInput);
    expect(firstNameInput).not.toBeInTheDocument();
  });
});
