import React from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface ICreateUserConfirmModalProps {
  isOpen: boolean;
  close: () => void;
  onSave: () => void;
}

const CreateUserConfirmModal = ({ isOpen, close, onSave }: ICreateUserConfirmModalProps) => {
  const modalTitleId = "create-user-modal-title";
  const modalDescriptionId = "create-user-modal-description";
  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescriptionId}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 530,
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 3,
        }}
      >
        <Typography id={modalTitleId} variant="h6">
          Are you sure you want to create the user?
        </Typography>
        <Typography id={modalDescriptionId} variant="body1" visibility="hidden">
          If you proceed a user will be created on the IDP.
        </Typography>
        <Stack direction="row" justifyContent="flex-end" sx={{ pt: 2 }}>
          <Button size="large" variant="text" onClick={close} sx={{ p: 0 }}>
            NO
          </Button>
          <Button size="large" variant="text" onClick={onSave} sx={{ p: 0 }}>
            YES
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateUserConfirmModal;
