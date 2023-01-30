import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { defaultModalContentStyle } from "../../Styles/defaultModalStyles";

interface EditOrganisationProps {
  isOpen: boolean;
  close: () => void;
  onContinue: () => void;
}

const EditOrganisationModal = ({
  isOpen,
  close,
  onContinue,
}: EditOrganisationProps): JSX.Element | null => {
  return (
    <Modal open={isOpen} onClose={close}>
      <Box sx={{ ...defaultModalContentStyle, width: { xs: "90%", md: 560 } }}>
        <Stack alignItems="center" spacing={2}>
          <Typography>Are you sure you want to edit this organisation?</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={close}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onContinue}>
              Edit Organisation
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditOrganisationModal;
