import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addressArray = useSelector((store) => store.auth.user.address);

  const handleSubmit = (e) => {
    e.preventDefault();
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

    dispatch(createOrder(address, navigate));
  };

  const handleSelectAddress = (address) => {
    dispatch(createOrder(address, navigate));
  };
  return (
    <div>
      <Grid container gap={4}>
        <Grid
          xs={12}
          lg={4}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          {addressArray.length > 0 &&
            addressArray.map((a) => (
              <div className="p-5 py-7 border-b">
                <AddressCard address={a} />
                <Button
                  sx={{ mt: 2, bgcolor: "#7f0000" }}
                  size="large"
                  variant="contained"
                  onClick={() => handleSelectAddress(a)}
                >
                  Deliver Here
                </Button>
              </div>
            ))}
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
                    autocomplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autocomplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autocomplete="given-name"
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
                    autocomplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autocomplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="pinCode"
                    name="pinCode"
                    label="PIN Code"
                    fullWidth
                    autocomplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autocomplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                  <Button
                    sx={{ mt: 2, bgcolor: "#7f0000" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
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
