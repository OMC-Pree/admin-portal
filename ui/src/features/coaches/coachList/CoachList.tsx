import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { IUser } from "../../../models/user";
import { SortOrder } from "../../../components/Table/table";
import EnhancedTableHead from "../../../components/Table/EnhancedTableHead";
import { ICoachTableData } from "../coach";
import { formatDate, formatTableData, getComparator, headCells } from "./coachListHelpers";

interface ICoachListProps {
  coaches: IUser[];
}

function CoachList({ coaches }: ICoachListProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ICoachTableData>("lastName");
  const rows = formatTableData(coaches);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const onSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof ICoachTableData);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table size="small">
        <EnhancedTableHead
          cells={headCells}
          onRequestSort={onSort}
          order={order}
          orderBy={orderBy}
        />
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          )
            .sort(getComparator(order, orderBy))
            .map((coach) => (
              <TableRow key={coach.id}>
                <TableCell sx={{ minWidth: 200 }}>{coach.id}</TableCell>
                <TableCell sx={{ minWidth: 104 }}>{coach.airTableId}</TableCell>
                <TableCell sx={{ minWidth: 96 }}>{coach.firstName}</TableCell>
                <TableCell sx={{ minWidth: 96 }}>{coach.lastName}</TableCell>
                <TableCell>{coach.email}</TableCell>
                <TableCell sx={{ minWidth: 72 }}>
                  {coach.dateOfBirth ? formatDate(coach.dateOfBirth) : "-"}
                </TableCell>
                <TableCell sx={{ minWidth: 72 }}>{coach.type}</TableCell>
                <TableCell sx={{ minWidth: 72 }}>{coach.permissions}</TableCell>
                <TableCell sx={{ minWidth: 72 }}>{formatDate(coach.createdAt)}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow sx={{ height: 53 * emptyRows }}>
              <TableCell colSpan={9} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={9}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CoachList;
