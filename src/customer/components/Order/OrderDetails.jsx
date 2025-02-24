import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { findOrderById } from "../../../State/Order/action";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const OrderDetails = () => {
  const navigate = useNavigate();
  const order = useSelector((store) => store.order.order);
  const loading = useSelector((store) => store.order.loading);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(findOrderById(params.orderId));
  }, [params.orderId, dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${[productId]}`);
    window.scrollTo(0, 0);
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

  if (!order) {
    return <p>No order found!</p>;
  }

  return (
    <div className="lg:px-20 px-5">
      <div className="p-5 mt-10 border rounded-md shadow-lg">
        <h1 className="font-bold text-xl pb-7 text-left">Delivery Address</h1>
        <AddressCard address={order?.shippingAddress} />
      </div>
      <div className="py-20">
        {order?.orderStatus === "CANCELLED" ? (
          <p className="font-semibold">This order was cancelled</p>
        ) : (
          <OrderTracker
            activeStep={
              order?.orderStatus === "PENDING"
                ? 0
                : order?.orderStatus === "PLACED"
                ? 1
                : order?.orderStatus === "CONFIRMED"
                ? 2
                : order?.orderStatus === "SHIPPED"
                ? 3
                : order?.orderStatus === "DELIVERED"
                ? 4
                : 0
            }
          />
        )}
      </div>

      <div className="flex-col space-y-5">
        {order?.orderItems?.map((orderItem, index) => (
          <div
            key={index}
            className="p-5 shadow-lg border rounded-md mb-5 flex flex-col lg:flex-row"
          >
            <div
              className="flex flex-col lg:flex-row items-center lg:items-start flex-grow cursor-pointer"
              onClick={() => {
                handleProductClick(orderItem?.product?._id);
              }}
            >
              {/* Product Image */}
              <div className="w-[7.5rem] h-[7.5rem] lg:w-[9rem] lg:h-[9rem] flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={orderItem?.product?.imageUrl}
                  alt="product"
                ></img>
              </div>

              {/* Product Description */}
              <div className="ml-0 lg:ml-5 space-y-1 text-left flex-1 mt-4 lg:mt-0">
                <p className="font-semibold text-sm lg:text-base">
                  {orderItem?.product?.title}
                </p>

                {/* Price Details */}
                <div className="flex space-x-5 items-center pt-4">
                  <p className="tracking-tight text-gray-900 text-sm lg:text-base">
                    ₹{orderItem?.price / orderItem?.quantity}
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Qty:{orderItem?.quantity}
                  </p>
                </div>
                <div className="flex space-x-5  items-center pt-4">
                  <p className="tracking-tight font-medium text-gray-900 text-sm lg:text-base">
                    Total: ₹{orderItem?.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Rate and Review Section */}
            <div className="flex space-x-1 justify-center items-center lg:ml-auto mt-4 lg:mt-0">
              <StarBorderIcon sx={{ fontSize: 28, color: "#FFBF00" }} />
              <p className="text-sm lg:text-base font-semibold text-[#FFBF00] cursor-pointer">
                Rate and Review
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-auto mt-5">
        <div className="border-2 rounded-md shadow-lg p-4">
          <p className="uppercase font-bold opacity-60 pb-4 text-left">
            Order Total
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
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
