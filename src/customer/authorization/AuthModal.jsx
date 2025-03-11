import React, { useState } from "react";
import { Box, Modal, useMediaQuery } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthModal = ({ handleClose, open }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [currentForm, setCurrentForm] = useState("login");

  const switchToRegister = () => {
    setCurrentForm("register");
  };

  const switchToLogin = () => {
    setCurrentForm("login");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : 500,
    maxWidth: 500,
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {currentForm === "login" ? (
          <LoginForm switchToRegister={switchToRegister} />
        ) : (
          <RegisterForm switchToLogin={switchToLogin} />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
