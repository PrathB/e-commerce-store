import { Box, CircularProgress, Grid } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";
import { useEffect } from "react";
import { getUserOrderHistory } from "../../../State/Order/action";
import { useDispatch, useSelector } from "react-redux";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orderArr = useSelector((store) => store.order.orders);
  const loading = useSelector((store) => store.order.loading);
  useEffect(() => {
    dispatch(getUserOrderHistory());
  }, [dispatch]);

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
    <div className="py-5 lg:px-20 px-5">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item lg={2.5} md={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 top-5">
            <h1 className="font-bold text-lg text-left">Filter</h1>
            <div className="space-y-4 mt-5">
              <h1 className="font-semibold text-left">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300"
                  ></input>
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item lg={9} md={9} className="pt-4 space-y-5">
          {orderArr.map((item, index) => (
            <OrderCard order={item} key={item?._id || index} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderHistory;
