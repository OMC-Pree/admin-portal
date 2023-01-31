import { Stack, Typography, Box, Divider } from "@mui/material";
import { NavOptions } from "./UserNavEnums";

const navItems: { text: string; page: NavOptions }[] = [
  { text: "Personal Info", page: NavOptions.PERSONAL_INFO },
  { text: "Address", page: NavOptions.ADDRESS },
  { text: "Bank Details", page: NavOptions.BANK_DETAILS },
  { text: "Tax Info", page: NavOptions.TAX_INFO },
  { text: "Investments", page: NavOptions.INVESTMENTS },
];

interface NavButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const NavButton = ({ text, active, onClick }: NavButtonProps) => (
  <>
    <Box sx={{ p: 1, cursor: "pointer" }} onClick={onClick}>
      <Typography
        variant="h4"
        sx={{ textDecoration: active ? "underline" : "none" }}
        onClick={onClick}
      >
        {text}
      </Typography>
    </Box>
    <Divider />
  </>
);

interface UserNavProps {
  currentPage: NavOptions;
  setCurrentPage: (page: NavOptions) => void;
}

const UserNav = ({ currentPage, setCurrentPage }: UserNavProps) => (
  <Stack sx={{ height: 500, width: "100%" }}>
    {navItems.map(({ text, page }) => (
      <NavButton
        key={page}
        text={text}
        active={currentPage === page}
        onClick={() => setCurrentPage(page)}
      />
    ))}
  </Stack>
);

export default UserNav;
