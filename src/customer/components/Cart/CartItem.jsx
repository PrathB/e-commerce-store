import React from "react";
import { Button } from "@mui/material";

const CartItem = () => {
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src="https://www.motrparts.com/wp-content/uploads/2019/12/Ford-Ecosport-Figo-Type-2-Diesel-Clutch-Set-8V2Z7B546V.jpg"
            alt="product image"
          ></img>
        </div>

        <div className="ml-5 space-y-1 text-left">
          <p className="font-semibold">
            Clutch Set (Clutch & Pressure Plate) 8V2Z7B546V – Fits Ford Ecosport
            / Figo / Fiesta (T2) / Figo Aspire (Dsl)
          </p>
          <p className="opacity-70 mt-2">Seller: Ford Genuine Part</p>
          <div className="flex space-x-5 items-center">
            <p className="tracking-tight text-gray-900">₹5,029.00</p>
            <p className="tracking-tight text-gray-900 opacity-60 line-through">
              ₹5,529.00
            </p>
            <p className="text-green-600 font-semibold">9% off</p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex flex-col items-start mr-4">
          <div className="flex items-center">
            <button
              type="button"
              // onClick={decrementQuantity}
              className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-l-md text-white"
            >
              -
            </button>
            <input
              type="text"
              value="1"
              // onChange={handleInputChange}
              className="w-12 text-center border-t border-b border-[#2c2c2c]"
            />
            <button
              type="button"
              // onClick={incrementQuantity}
              className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-r-md text-white"
            >
              +
            </button>
          </div>
        </div>

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
