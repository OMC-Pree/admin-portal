import { screen } from "../test-utils";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import { loginAsUser } from "../helpers";
import { MOCK_COACHES } from "../../mocks/data/mockCoaches";
import userEvent from "@testing-library/user-event";

const manager = MOCK_MANAGERS[0];

const findFilterInput = async () =>
  screen.findByRole("textbox", {
    name: /filter/i,
  }) as Promise<HTMLInputElement>;

describe("CoachList", () => {
  beforeEach(async () => {
    loginAsUser(manager);
    await screen.findByRole("heading", { name: /coach list/i });
  });

  test("coaches loaded", async () => {
    const coach = MOCK_COACHES[0];
    await screen.findByRole("cell", { name: coach.id });
    MOCK_COACHES.forEach((_coach) => {
      expect(screen.getByRole("cell", { name: _coach.id })).toBeInTheDocument();
    });
  });

  test("filter list of coaches", async () => {
    const coach1 = MOCK_COACHES[0];
    const coach2 = MOCK_COACHES[1];
    await screen.findByRole("cell", { name: coach1.id });
    const coach2IdTableCell = screen.getByRole("cell", { name: coach2.id });
    expect(coach2IdTableCell).toBeInTheDocument();
    const filterInput = await findFilterInput();
    await userEvent.type(filterInput, coach1.id, { delay: 1 });
    expect(coach2IdTableCell).not.toBeInTheDocument();
  });

  test("clear list filter", async () => {
    const FILTER_TEXT = "stuffnsuch";
    const filterInput = await findFilterInput();
    await userEvent.type(filterInput, FILTER_TEXT, { delay: 1 });
    expect(filterInput.value).toBe(FILTER_TEXT);
    userEvent.click(screen.getByLabelText(/clear the list filter/i));
    expect(filterInput.value).toBe("");
  });
});
