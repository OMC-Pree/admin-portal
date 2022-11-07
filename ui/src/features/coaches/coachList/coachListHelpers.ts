import { format, parseISO } from "date-fns";
import { pick } from "lodash";
import { IHeadCell, SortOrder } from "../../../components/table/table";
import { IUser } from "../../user/userModels";
import { ICoachTableData } from "../coach";

export const formatTableData = (coaches: IUser[]): ICoachTableData[] =>
  coaches.map((coach) => ({
    ...pick(coach, ["id", "airTableId", "firstName", "lastName", "email", "type", "createdAt"]),
    permissions: coach.permissions.join(","),
  }));

export const headCells: IHeadCell[] = [
  { id: "id", label: "ID", numeric: false, disablePadding: false },
  { id: "airTableId", label: "AirTable ID", numeric: false, disablePadding: false },
  { id: "firstName", label: "First name", numeric: false, disablePadding: false },
  { id: "lastName", label: "Last name", numeric: false, disablePadding: false },
  { id: "email", label: "Email", numeric: false, disablePadding: false },
  { id: "type", label: "Type", numeric: false, disablePadding: false },
  { id: "permissions", label: "Permissions", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Created", numeric: false, disablePadding: false },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const first = a[orderBy],
    second = b[orderBy];
  if (["createdAt", "dateOfBirth"].includes(String(orderBy))) {
    const dateA = new Date(String(first)).getTime();
    const dateB = new Date(String(second)).getTime();
    return dateB < dateA ? -1 : dateB > dateA ? 1 : 0;
  }
  return second < first ? -1 : second > first ? 1 : 0;
}

export function getComparator<Key extends keyof ICoachTableData>(
  order: SortOrder,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const formatDate = (date: string) => format(parseISO(date), "dd-MM-yy");
