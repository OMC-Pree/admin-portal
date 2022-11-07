import userEvent from "@testing-library/user-event";
import { screen, within } from "../test-utils";
import { MOCK_MANAGERS } from "../../mocks/data/mockManagers";
import { loginAsUser } from "../helpers";
import { MOCK_COACHES } from "../../mocks/data/mockCoaches";
import { IUser } from "../../features/user/userModels";
import { MOCK_CLIENTS } from "../../mocks/data/mockClients";
import { format, parseISO } from "date-fns";

const user = MOCK_MANAGERS[0];

async function navToClientDetailPage(coach: IUser, client: IUser) {
  userEvent.click(screen.getByRole("cell", { name: coach.id }));
  await screen.findByRole("cell", { name: client.id });
  userEvent.click(screen.getByRole("cell", { name: client.id }));
  const detailPanel = await screen.findByTestId("user-detail-panel");
  return { detailPanel };
}

describe("Client detail page", () => {
  beforeEach(async () => {
    loginAsUser(user);
    await screen.findByRole("cell", { name: MOCK_COACHES[0].id });
  });

  test("client details loaded", async () => {
    const coach = MOCK_COACHES[0];
    const client = MOCK_CLIENTS[0];
    const { detailPanel } = await navToClientDetailPage(coach, client);
    expect(within(detailPanel).getByText(client.id)).toBeInTheDocument();
    expect(within(detailPanel).getByText(client.firstName)).toBeInTheDocument();
    expect(within(detailPanel).getByText(client.lastName)).toBeInTheDocument();
    expect(within(detailPanel).getByText(client.email)).toBeInTheDocument();
    expect(
      within(detailPanel).getByText(format(parseISO(client.createdAt), "dd-MM-yyyy")),
    ).toBeInTheDocument();
  });
});
