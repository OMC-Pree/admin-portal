import { Stack, Typography, Box } from "@mui/material";
import { NavOptions } from "./UserNavEnums";

interface NavButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const NavButton = ({ text, active, onClick }: NavButtonProps) => {
  return (
    <Box
      sx={{
        height: 90,
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid #E5E5E5",
        borderBottom: "1px solid #E5E5E5",
        backgroundColor: active ? "#2E18AF" : "#2C1949",
        cursor: "pointer",
        borderRadius: 3,
      }}
      onClick={onClick}
    >
      <Typography variant="h2" sx={{ color: "#FFF" }}>
        {text}
      </Typography>
    </Box>
  );
};

interface UserNavProps {
  currentPage: NavOptions;
  setCurrentPage: (page: NavOptions) => void;
}

const UserNav = ({ currentPage, setCurrentPage }: UserNavProps) => {
  return (
    <Stack sx={{ height: 500, width: "100%" }}>
      <NavButton
        text="Personal Info"
        active={currentPage === NavOptions.PERSONAL_INFO}
        onClick={() => setCurrentPage(NavOptions.PERSONAL_INFO)}
      />
      <NavButton
        text="Address"
        active={currentPage === NavOptions.ADDRESS}
        onClick={() => setCurrentPage(NavOptions.ADDRESS)}
      />
      <NavButton
        text="Bank Details"
        active={currentPage === NavOptions.BANK_DETAILS}
        onClick={() => setCurrentPage(NavOptions.BANK_DETAILS)}
      />
      <NavButton
        text="Tax Info"
        active={currentPage === NavOptions.TAX_INFO}
        onClick={() => setCurrentPage(NavOptions.TAX_INFO)}
      />
    </Stack>
  );
};

export default UserNav;
