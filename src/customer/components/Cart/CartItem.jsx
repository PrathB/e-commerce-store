import React from "react";
import { Button } from "@mui/material";

const CartItem = () => {
  return (
    <div className="p-5 shadow-lg border rounded-md mb-5">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Product Image */}
        <div className="w-[7.5rem] h-[7.5rem] lg:w-[9rem] lg:h-[9rem] flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src="https://www.motrparts.com/wp-content/uploads/2019/12/Ford-Ecosport-Figo-Type-2-Diesel-Clutch-Set-8V2Z7B546V.jpg"
            alt="product image"
          ></img>
        </div>

        {/* Product Description */}
        <div className="ml-0 lg:ml-5 space-y-1 text-left flex-1 mt-4 lg:mt-0">
          <p className="font-semibold text-sm lg:text-base">
            Clutch Set (Clutch & Pressure Plate) 8V2Z7B546V – Fits Ford Ecosport
            / Figo / Fiesta (T2) / Figo Aspire (Dsl)
          </p>
          <p className="opacity-70 mt-2 text-xs lg:text-sm">
            Seller: Ford Genuine Part
          </p>

          {/* Price Details */}
          <div className="flex space-x-5 items-center pt-4">
            <p className="tracking-tight text-gray-900 text-sm lg:text-base">
              ₹5,029.00
            </p>
            <p className="tracking-tight text-gray-900 opacity-60 line-through text-sm lg:text-base">
              ₹5,529.00
            </p>
            <p className="text-green-600 font-semibold text-xs lg:text-sm">
              9% off
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
              >
                -
              </button>
              <input
                type="text"
                value="1"
                className="w-12 text-center border-t border-b border-[#2c2c2c]"
              />
              <button
                type="button"
                className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-r-md text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <div>
          <Button sx={{ color: "RGB(127 0 0)", fontWeight: "bold" }}>
            REMOVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
