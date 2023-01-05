import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import { createRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { COLOURS } from "../theme/colours";

interface IHeaderMenuProps {
  onLogout: () => void;
  onCloseMenu: () => void;
}

function HeaderMenu({ onLogout, onCloseMenu }: IHeaderMenuProps) {
  const ref = createRef<HTMLUListElement>();
  useOutsideClick(ref, onCloseMenu);

  return (
    <Box position="relative">
      <Box
        sx={{
          position: "absolute",
          width: "fit-content",
          minWidth: 200,
          bgcolor: COLOURS.WHITE,
          right: 0,
          border: "1px solid",
          borderWidth: "0 0 1px 1px",
          zIndex: 10,
        }}
      >
        <MenuList sx={{ padding: 0 }} ref={ref}>
          <MenuItem onClick={onLogout}>
            <Typography sx={{ color: COLOURS.PINK[600] }} variant="button">
              LOGOUT
            </Typography>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  );
}

export default HeaderMenu;
