import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../State/Authorization/action";
import { Close } from "@mui/icons-material";

const RegisterForm = ({ switchToLogin }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const loading = useSelector((store) => store.auth.isLoading);
  const error = useSelector((store) => store.auth.error);
  const [showError, setShowError] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const formRef = useRef(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    let isValid = true;

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    // If valid, dispatch registration
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email,
      password,
    };

    dispatch(register(userData));
    setShowError(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpen(false);
        switchToLogin();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [switchToLogin]);

  useEffect(() => {
    if (user) {
      setIsOpen(false);
      switchToLogin();
    }
  }, [user, switchToLogin]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="password"
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                className="w-full"
                sx={{
                  padding: ".8rem 0",
                  bgcolor: "#7f0000",
                  "&:hover": { backgroundColor: "#500000" },
                }}
                size="large"
                type="submit"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Register"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <div className="flex justify-center flex-col items-center">
          <div className="py-3 flex items-center">
            <p>If you already have an account, </p>
            <p
              className="cursor-pointer font-semibold text-blue-600 hover:opacity-60 ml-1"
              onClick={switchToLogin}
            >
              login
            </p>
          </div>
          <div className="w-full">
            {error && showError && (
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowError(false)}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default RegisterForm;
