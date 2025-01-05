import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (n) => {
    const data = { quantity: item.quantity + n };
    console.log(item._id, data);
    dispatch(updateCartItem(item._id, data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md mb-5">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Product Image */}
        <div className="w-[7.5rem] h-[7.5rem] lg:w-[9rem] lg:h-[9rem] flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={item.product.imageUrl}
            alt="product image"
          ></img>
        </div>

        {/* Product Description */}
        <div className="ml-0 lg:ml-5 space-y-1 text-left flex-1 mt-4 lg:mt-0">
          <p className="font-semibold text-sm lg:text-base">
            {item.product.title}
          </p>
          <p className="opacity-70 mt-2 text-xs lg:text-sm">
            Brand: {item.product.brand}
          </p>

          {/* Price Details */}
          <div className="flex space-x-5 items-center pt-4">
            <p className="tracking-tight text-gray-900 text-sm lg:text-base">
              ₹{item.product.discountedPrice}
            </p>
            <p className="tracking-tight text-gray-900 opacity-60 line-through text-sm lg:text-base">
              ₹{item.product.price}
            </p>
            <p className="text-green-600 font-semibold text-xs lg:text-sm">
              {item.product.discountPercent}% off
            </p>
          </div>
        </div>
      </div>

      {/* Quantity and Remove Button */}
      <div className="flex flex-col lg:flex-row lg:space-x-10 pt-4">
        <div className="flex flex-col items-start mr-4 mb-4 lg:mb-0">
          <div className="flex flex-row items-center space-x-3">
            <p className="font-semibold"> Qty:</p>
            <div className="flex items-center">
              <button
                type="button"
                className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-l-md text-white"
                onClick={() => {
                  handleUpdateCartItem(-1);
                }}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                value={item.quantity}
                className="w-12 text-center border-t border-b border-[#2c2c2c]"
              />
              <button
                type="button"
                className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-r-md text-white"
                onClick={() => {
                  handleUpdateCartItem(1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "RGB(127 0 0)", fontWeight: "bold" }}
          >
            REMOVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
