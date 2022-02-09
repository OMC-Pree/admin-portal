import { MenuItem, MenuList, Typography } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { COLOURS } from "../theme/colours";

interface IHeaderMenuProps {
  onLogout: () => void;
  onCloseMenu: () => void;
}

function HeaderMenu({ onLogout, onCloseMenu }: IHeaderMenuProps) {
  const ref = createRef<HTMLUListElement>();

  useEffect(() => {
    const handleClickOutside = createOutsideClickHandler({ ref, onCloseMenu });
    const handleKeyup = createKeyupHandler({ ref, onCloseMenu });
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [ref, onCloseMenu]);

  return (
    <MenuList sx={{ padding: 0 }} ref={ref}>
      <MenuItem onClick={onLogout}>
        <Typography sx={{ color: COLOURS.PINK[600] }} variant="button">
          LOGOUT
        </Typography>
      </MenuItem>
    </MenuList>
  );
}

export default HeaderMenu;

interface IEventHandlerProps {
  ref: React.RefObject<HTMLUListElement>;
  onCloseMenu: () => void;
}

const createOutsideClickHandler =
  ({ ref, onCloseMenu }: IEventHandlerProps) =>
  (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Element)) {
      onCloseMenu && onCloseMenu();
    }
  };

const createKeyupHandler =
  ({ ref, onCloseMenu }: IEventHandlerProps) =>
  (event: KeyboardEvent) => {
    if (ref.current) {
      if (event.key === "Escape") onCloseMenu && onCloseMenu();
    }
  };
