import { Button } from "@mui/material";
import { NavLink as RrNavLink } from "react-router-dom";
import { COLOURS } from "../theme/colours";

interface INavLinkProps {
  to: string;
  title: string;
}

const NavLink = ({ to, title, ...rest }: INavLinkProps) => {
  return (
    <Button>
      <RrNavLink
        to={to}
        style={({ isActive }) => ({
          color: isActive ? COLOURS.PURPLE[600] : COLOURS.PINK[600],
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 14,
          textTransform: "uppercase",
        })}
        {...rest}
      >
        {title}
      </RrNavLink>
    </Button>
  );
};

export default NavLink;
