import { pick } from "lodash";
import { IHeadCell, SortOrder } from "../../../components/table/table";
import { IUser } from "../../user/userModels";
import { IClientTableData } from "../client";

export const formatTableData = (clients: IUser[]): IClientTableData[] =>
  clients.map((client) => ({
    ...pick(client, ["id", "airTableId", "firstName", "lastName", "email"]),
  }));

export const headCells: IHeadCell[] = [
  { id: "firstName", label: "First name", numeric: false, disablePadding: false },
  { id: "lastName", label: "Last name", numeric: false, disablePadding: false },
  { id: "email", label: "Email", numeric: false, disablePadding: false },
  { id: "id", label: "ID", numeric: false, disablePadding: false },
  { id: "airTableId", label: "AirTable ID", numeric: false, disablePadding: false },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const first = a[orderBy],
    second = b[orderBy];
  return second < first ? -1 : second > first ? 1 : 0;
}

export function getComparator<Key extends keyof IClientTableData>(
  order: SortOrder,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
