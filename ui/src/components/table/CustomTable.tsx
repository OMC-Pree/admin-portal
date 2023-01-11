import { ExpandMore, ExpandLess } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCellProps,
  TableProps,
  Typography,
  TableFooter,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { COLOURS } from "../../theme/colours";

export type CellData = { content: string | JSX.Element; props?: TableCellProps };

export type CustomTableRow = {
  items: CellData[];
  isCollapsible?: boolean;
  collapsedContent?: JSX.Element;
};

export type CustomTableProps = {
  headers: CellData[];
  rows: CustomTableRow[];
  size?: TableProps["size"];
  footer?: JSX.Element;
  footerBg?: string;
  isCollapsible?: boolean;
  dataTestId?: string;
};

const Row = ({
  items,
  children,
  isCollapsible,
}: PropsWithChildren<CustomTableRow>): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        hover={false}
        sx={{
          "&:nth-of-type(even)": {
            backgroundColor: "transparent",
          },
          "&:nth-of-type(4n+3)": {
            backgroundColor: COLOURS.GREY[100],
          },
        }}
      >
        {isCollapsible && (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? (
                <ExpandMore style={{ color: COLOURS.PINK[600], width: 16, paddingTop: 2 }} />
              ) : (
                <ExpandLess style={{ color: COLOURS.PINK[600], width: 16, paddingTop: 2 }} />
              )}
            </IconButton>
          </TableCell>
        )}
        {items.map(({ content, props }, idx) => (
          <TableCell key={`header-${idx}`} align={props?.align}>
            {typeof content === "string" ? (
              <Typography variant="subtitle1" color={COLOURS.GREY[700]}>
                {content}
              </Typography>
            ) : (
              content
            )}
          </TableCell>
        ))}
      </TableRow>
      <TableRow
        sx={{
          "&:nth-of-type(even)": {
            backgroundColor: "transparent",
          },
          "&:nth-of-type(4n+4)": {
            backgroundColor: COLOURS.GREY[100],
          },
        }}
      >
        <TableCell sx={{ p: 0 }} />
        <TableCell colSpan={items.length + 1} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CustomTable = ({
  headers,
  rows,
  size,
  footer,
  footerBg = "transparent",
  isCollapsible,
  dataTestId,
}: CustomTableProps): JSX.Element => {
  return (
    <TableContainer>
      <Table size={size} data-testid={dataTestId}>
        <TableHead>
          <TableRow>
            {isCollapsible && <TableCell sx={{ width: "48px" }} />}

            {headers.map(({ content, props }, idx) => (
              <TableCell key={`header-${idx}`} {...props}>
                {content}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <Row key={`row-${idx}`} items={row.items} isCollapsible={isCollapsible}>
              {row.collapsedContent}
            </Row>
          ))}
        </TableBody>
        {footer && (
          <TableFooter>
            <TableRow sx={{ backgroundColor: footerBg }}>{footer}</TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
