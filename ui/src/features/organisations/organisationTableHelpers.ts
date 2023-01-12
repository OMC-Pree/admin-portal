import { IHeadCell, SortOrder } from "../../components/table/table";
import { Organisation } from "./organisationModel";

export const organisationHeadCells: IHeadCell[] = [
  { id: "organisationId", label: "Organisation ID", disablePadding: false, numeric: false },
  { id: "name", label: "Organisation name", disablePadding: false, numeric: false },
  { id: "createdAt", label: "Created at", disablePadding: false, numeric: false },
  { id: "lastUpdated", label: "Last updated", disablePadding: false, numeric: false },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const first = a[orderBy],
    second = b[orderBy];
  return second < first ? -1 : second > first ? 1 : 0;
}

export function getOrganisationComparator<Key extends keyof Organisation>(
  order: SortOrder,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
