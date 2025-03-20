import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findUserCart } from "../../../State/Cart/action";
import { Box, CircularProgress } from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };
  const { cart, loading } = useSelector((store) => store.cart);
  const addedCartItem = useSelector((store) => store.cart.addedCartItem);
  const updatedCartItem = useSelector((store) => store.cart.updatedCartItem);
  const removedCartItem = useSelector((store) => store.cart.removedCartItem);

  useEffect(() => {
    dispatch(findUserCart());
  }, [dispatch,addedCartItem, updatedCartItem, removedCartItem]);

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
      <div className="lg:grid grid-cols-3 pt-6 px-4 lg:px-16 relative">
        <div className="col-span-2 space-y-4">
          {cart?.cartItems.length === 0 && <p>Your Cart Is Empty!</p>}
          {cart?.cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="px-5 h-auto mt-5 lg:mt-0">
          <div className="border-2 rounded-md shadow-lg p-4">
            <p className="uppercase font-bold opacity-60 pb-4 text-left">
              Cart Total
            </p>
            <hr />
            <div className="space-y-3 font-semibold mb-6">
              <div className="flex justify-between pt-3 text-black">
                <span>Subtotal</span>
                <span>₹{cart?.subTotalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-black">
                <span>Shipping</span>
                <span>₹{cart?.shippingCost.toLocaleString('en-IN')}</span>
              </div>
              <hr />
              <div className="flex justify-between text-black text-lg font-bold">
                <span>Total</span>
                <span>₹{cart?.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#7f0000] px-8 py-3 text-base font-medium text-white hover:bg-[#500000] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
