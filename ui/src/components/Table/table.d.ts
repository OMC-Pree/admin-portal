export type SortOrder = "asc" | "desc";

export interface IHeadCell {
  id: string;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}
