import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface CreateOrganisationConfirmModalProps {
  isOpen: boolean;
  close: () => void;
  onSave: () => void;
}

const CreateOrganisationConfirmModal = ({
  isOpen,
  close,
  onSave,
}: CreateOrganisationConfirmModalProps) => {
  const modalTitleId = "create-organisation-modal-title";
  const modalDescriptionId = "create-organisation-modal-description";
  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescriptionId}
      componentsProps={{ backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.75)" } } }}
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: 120,
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 3,
        }}
      >
        <Stack direction="column" justifyContent="flex-end">
          <Typography id={modalTitleId} variant="h6" sx={{ pb: 1 }}>
            Are you sure?
          </Typography>
          <Typography id={modalDescriptionId} variant="body1" sx={{ pb: 1 }}>
            If you proceed an organisation will be created on the IDP.
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" sx={{ pt: 2 }}>
          <Button
            variant="text"
            onClick={close}
            sx={{ p: 1, width: 150 }}
            aria-label="cancel creating new organisation"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave} aria-label="create new organisation">
            Create Organisation
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateOrganisationConfirmModal;
