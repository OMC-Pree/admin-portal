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
import { IUser } from "../../user/userModels";
import { SortOrder } from "../../../components/table/table";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { formatTableData, getComparator, headCells } from "./clientListHelpers";
import { useNavigate } from "react-router-dom";
import { COLOURS } from "../../../theme/colours";
import { IClientTableData } from "../client";

interface CustomerListProps {
  users: IUser[];
}

function CustomerList({ users }: CustomerListProps) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IClientTableData>("lastName");
  const rows = formatTableData(users);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const onSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof IClientTableData);
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
            .map((client) => (
              <TableRow
                key={client.id}
                onClick={() => navigate(`/clients/${client.id}`)}
                sx={{ cursor: "pointer", "&:hover": { bgcolor: COLOURS.PURPLE[100] } }}
                title={`open details page for ${client.firstName} ${client.lastName}`}
              >
                <TableCell sx={{ minWidth: 96 }}>{client.firstName}</TableCell>
                <TableCell sx={{ minWidth: 96 }}>{client.lastName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell sx={{ minWidth: 200 }}>{client.id}</TableCell>
                <TableCell sx={{ minWidth: 104 }}>{client.airTableId}</TableCell>
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

export default CustomerList;
