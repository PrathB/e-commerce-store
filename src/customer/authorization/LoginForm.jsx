import { Alert, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Authorization/action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.auth.error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
  };
  console.log(error);

  return (
    <div>
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
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p> you don't have an account, </p>
          <p
            className="cursor-pointer font-semibold text-blue-600 hover:opacity-60 ml-1"
            onClick={() => navigate("/register")}
          >
            register
          </p>
        </div>
        <div className="w-full">
          {error && <Alert severity="error">Invalid email or password.</Alert>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
