import userEvent from "@testing-library/user-event";
import { screen, within } from "../test-utils";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import { loginAsUser } from "../helpers";
import { MOCK_COACHES } from "../../mocks/data/mockCoaches";
import { IUser } from "../../features/user/userModels";
import { MOCK_CLIENTS } from "../../mocks/data/mockClients";
import { format, parseISO } from "date-fns";

const user = MOCK_MANAGERS[0];

async function navToCoachDetailPage(coach: IUser) {
  userEvent.click(screen.getByRole("cell", { name: coach.id }));
  const detailPanel = await screen.findByTestId("user-detail-panel");
  return { detailPanel };
}

const findFilterInput = async () =>
  screen.findByRole("textbox", {
    name: /filter/i,
  }) as Promise<HTMLInputElement>;

describe("Coach detail page", () => {
  beforeEach(async () => {
    loginAsUser(user);
    await screen.findByRole("cell", { name: MOCK_COACHES[0].id });
  });

  test("coach details loaded", async () => {
    const coach = MOCK_COACHES[0];
    const { detailPanel } = await navToCoachDetailPage(coach);
    expect(within(detailPanel).getByText(coach.id)).toBeInTheDocument();
    expect(within(detailPanel).getByText(coach.firstName)).toBeInTheDocument();
    expect(within(detailPanel).getByText(coach.lastName)).toBeInTheDocument();
    expect(within(detailPanel).getByText(coach.email)).toBeInTheDocument();
    expect(
      within(detailPanel).getByText(format(parseISO(coach.createdAt), "dd-MM-yyyy")),
    ).toBeInTheDocument();
  });

  test("assigned clients loaded in table", async () => {
    const coach = MOCK_COACHES[0];
    const clients = MOCK_CLIENTS.filter((client) => client.coachUserId === coach.id);
    await navToCoachDetailPage(coach);
    await screen.findByRole("cell", { name: clients[0].id });
    clients.forEach((client) => {
      expect(screen.getByRole("cell", { name: client.id })).toBeInTheDocument();
    });
  });

  test("no assigned clients text shown", async () => {
    const coach = MOCK_COACHES[2];
    await navToCoachDetailPage(coach);
    expect(screen.getByText(/There are no clients to display/i)).toBeInTheDocument();
  });

  test("filter list of clients", async () => {
    const coach = MOCK_COACHES[0];
    const client1 = MOCK_CLIENTS[0];
    const client2 = MOCK_CLIENTS[1];
    await navToCoachDetailPage(coach);
    await screen.findByRole("cell", { name: client1.email });
    const client2IdTableCell = screen.getByRole("cell", { name: client2.email });
    expect(client2IdTableCell).toBeInTheDocument();
    const filterInput = await findFilterInput();
    await userEvent.type(filterInput, client1.email, { delay: 1 });
    expect(client2IdTableCell).not.toBeInTheDocument();
  });

  test("clear list filter", async () => {
    const coach = MOCK_COACHES[0];
    const client = MOCK_CLIENTS[0];
    const FILTER_TEXT = "stuffnsuch";
    await navToCoachDetailPage(coach);
    await screen.findByRole("cell", { name: client.email });
    const filterInput = await findFilterInput();
    await userEvent.type(filterInput, FILTER_TEXT, { delay: 1 });
    expect(filterInput.value).toBe(FILTER_TEXT);
    userEvent.click(screen.getByLabelText(/clear the list filter/i));
    expect(filterInput.value).toBe("");
  });
});
