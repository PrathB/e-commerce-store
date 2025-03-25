import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { findOrderById } from "../../../State/Order/action";
import { useLocation } from "react-router-dom";
import OrderSummaryItem from "./OrderSummaryItem";
import { Box, Button, CircularProgress } from "@mui/material";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order, loading } = useSelector((store) => store.order);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      dispatch(findOrderById(orderId));
    }
  }, [orderId]);

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
    <div className="p-4">
      {/* Address card section */}
      <div className="p-5 shadow-lg rounded-md border mb-6">
        {order?.shippingAddress ? (
          <AddressCard address={order.shippingAddress} />
        ) : (
          <p>Loading address...</p>
        )}
      </div>

      {/* Main order summary */}
      <div>
        <div className="lg:grid grid-cols-3 gap-6 relative">
          {/* Cart items */}
          {order?.orderItems?.length > 0 && (
            <div className="col-span-2 space-y-4">
              {order.orderItems.map((item) => (
                <OrderSummaryItem item={item} key={item._id} />
              ))}
            </div>
          )}

          {/* Cart total section */}
          <div className="px-5 h-auto mt-5 lg:mt-0">
            <div className="border-2 rounded-md shadow-lg p-4">
              <p className="uppercase font-bold opacity-60 pb-4 text-left">
                Cart Total
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-6">
                <div className="flex justify-between pt-3 text-black">
                  <span>Subtotal</span>
                  <span>₹{order?.subTotalPrice}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Shipping</span>
                  <span>₹{order?.shippingCost}</span>
                </div>
                <hr />
                <div className="flex justify-between text-black text-lg font-bold">
                  <span>Total</span>
                  <span>₹{order?.totalPrice}</span>
                </div>
              </div>

              {/* Proceed to Pay button */}
              <Button
                sx={{
                  mt: 2,
                  bgcolor: "#7f0000",
                  "&:hover": { backgroundColor: "#500000" },
                }}
                size="large"
                variant="contained"
                fullWidth="true"
                type="submit"
              >
                Proceed to pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
