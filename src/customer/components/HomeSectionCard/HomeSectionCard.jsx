import { BorderColor } from "@mui/icons-material";
import React from "react";

const HomeSectionCard = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 mb-2 border py-2 hover:border-[#7f0000]">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover w-full h-full"
          src={product.imageUrl}
          alt="Product Image"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800">{product.title}</h3>
        <h3 className="text-lg font-medium text-black mt-2 ">
          ₹{product.price}
        </h3>
      </div>
    </div>
  );
};

export default HomeSectionCard;
