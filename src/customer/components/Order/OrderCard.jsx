import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/account/order-history/${5}`)}
      className="lg:p-5 p-2 shadow-md hover:shadow-xl border cursor-pointer"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} sm={6}>
          {order?.orderItems?.map((orderItem) => (
            <div className="flex">
              <img
                className="w-[6rem] h-[6rem] object-cover"
                src={orderItem?.product?.imageUrl}
                alt="product"
              />
              <div className="ml-5 text-left">
                <p>
                  {orderItem?.product?.title} x {orderItem?.quantity}
                </p>
              </div>
            </div>
          ))}
        </Grid>
        <Grid item xs={6} sm={2}>
          <p className="text-left mx-2 text-gray-700 font-medium">
            Total Price: ₹{order?.totalPrice}
          </p>
        </Grid>

        <Grid item xs={12} sm={4}>
          <div>
            <p className="text-left">
              <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className={`mr-2 text-sm ${
                  order?.orderStatus === "PENDING"
                    ? "text-red-500"
                    : order?.orderStatus === "PLACED"
                    ? "text-orange-400"
                    : order?.orderStatus === "CONFIRMED"
                    ? "text-green-300"
                    : order?.orderStatus === "SHIPPED"
                    ? "text-green-400"
                    : order?.orderStatus === "DELIVERED"
                    ? "text-green-500"
                    : "text-red-800"
                }`}
              />
              <span>{order?.orderStatus}</span>
            </p>
            <p className="text-xs text-left">
              {order?.orderStatus === "PENDING"
                ? "Payment is pending"
                : order?.orderStatus === "PLACED"
                ? "Your order will be confirmed shortly"
                : order?.orderStatus === "CONFIRMED"
                ? "Your order has been confirmed and will be out for shipping"
                : order?.orderStatus === "SHIPPED"
                ? "Your order has been shipped"
                : order?.orderStatus === "DELIVERED"
                ? "Your order has been delivered"
                : order?.orderStatus === "CANCELLED"
                ? "This order was cancelled"
                : ""}
            </p>
          </div>

          {false && (
            <p>
              <span>Expected delivery on March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
