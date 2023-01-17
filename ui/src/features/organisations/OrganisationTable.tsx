import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getOrganisationComparator, organisationHeadCells } from "./organisationTableHelpers";
import { Organisation } from "./organisationModel";
import EnhancedTableHead from "../../components/table/EnhancedTableHead";
import { ChangeEvent, MouseEvent, useState } from "react";
import { SortOrder } from "../../components/table/table";
import { useNavigate } from "react-router-dom";
import { COLOURS } from "../../theme/colours";

interface OrganisationTableProps {
  rows: Organisation[];
}

function OrganisationTable({ rows }: OrganisationTableProps) {
  const [order, setOrder] = useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof Organisation>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const onSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof Organisation);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table size="small">
        <EnhancedTableHead
          cells={organisationHeadCells}
          onRequestSort={onSort}
          order={order}
          orderBy={orderBy}
        />
        <TableBody>
          {(rowsPerPage > 0
            ? [...rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)]
            : [...rows]
          )
            .sort(getOrganisationComparator(order, orderBy))
            .map((row) => {
              return (
                <TableRow
                  key={row.id}
                  onClick={() => navigate(`/organisations/${row.id}`)}
                  sx={{ cursor: "pointer", "&:hover": { bgcolor: COLOURS.PURPLE[100] } }}
                  title={`Open details page for ${row.name}`}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default OrganisationTable;
