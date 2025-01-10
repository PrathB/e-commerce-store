import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/action";

const OrderSummaryItem = ({ item }) => {
  const dispatch = useDispatch();

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

          <div className="flex space-x-5 items-center pt-4">
            <p className=" text-sm lg:text-base">Qty: {item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
