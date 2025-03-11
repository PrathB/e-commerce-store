import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../State/Authorization/action";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = ({ switchToRegister }) => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.auth.error);
  const user = useSelector((store) => store.auth.user);
  const loading = useSelector((store) => store.auth.isLoading);
  const [isOpen, setIsOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
    setShowError(true);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                  "Login"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <div className="flex justify-center flex-col items-center">
          <div className="py-3 flex items-center">
            <p>You don't have an account?</p>
            <p
              className="cursor-pointer font-semibold text-blue-600 hover:opacity-60 ml-1"
              onClick={switchToRegister}
            >
              Register
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

export default LoginForm;
