import { Box, Button, Grid, TextField, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/action";
import { useNavigate } from "react-router-dom";

// TODO: handle error

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((store) => store.auth);
  const addressArray = user?.address || [];
  const [submittingId, setSubmittingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittingId("form");
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      pinCode: data.get("pinCode"),
      mobile: data.get("phoneNumber"),
    };

    dispatch(createOrder(address, navigate)).finally(() =>
      setSubmittingId(null)
    );
  };

  const handleSelectAddress = (address, id) => {
    setSubmittingId(id);
    dispatch(createOrder(address, navigate)).finally(() =>
      setSubmittingId(null)
    );
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Grid container gap={4}>
        <Grid
          item
          xs={12}
          lg={4}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          {Array.isArray(addressArray) && addressArray.length > 0 ? (
            addressArray.map((a) => (
              <div key={a._id} className="p-5 py-7 border-b">
                <AddressCard address={a} />
                <Button
                  sx={{
                    mt: 2,
                    bgcolor: "#7f0000",
                    "&:hover": { backgroundColor: "#500000" },
                  }}
                  size="large"
                  variant="contained"
                  disabled={submittingId !== null}
                  onClick={() => handleSelectAddress(a, a._id)}
                >
                  {submittingId === a._id ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    </Box>
                  ) : (
                    "Deliver here"
                  )}
                </Button>
              </div>
            ))
          ) : (
            <p>No saved addresses found.</p>
          )}
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
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
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="pinCode"
                    name="pinCode"
                    label="PIN Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                  <Button
                    sx={{
                      mt: 2,
                      bgcolor: "#7f0000",
                      "&:hover": { backgroundColor: "#500000" },
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={submittingId !== null}
                  >
                    {submittingId === "form" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <CircularProgress
                          size={24}
                          sx={{ color: "white", mr: 1 }}
                        />
                        Submitting...
                      </Box>
                    ) : (
                      "Deliver here"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
