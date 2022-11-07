import { IUser } from "../../features/user/userModels";
import { MOCK_CLIENTS } from "./mockClients";
import { MOCK_COACHES } from "./mockCoaches";
import { MOCK_MANAGERS } from "./mockManagers";

export const MOCK_USERS: IUser[] = [...MOCK_MANAGERS, ...MOCK_COACHES, ...MOCK_CLIENTS];
