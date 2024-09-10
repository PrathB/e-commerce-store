import React from "react";

const HomeSectionCard = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-auto mx-2 mb-4 border py-2 hover:border-[#7f0000]">
      <div className="h-auto w-auto sm:h-[15rem] sm:w-auto">
        <img
          className="object-cover w-full h-full"
          src={product.imageUrl}
          alt="Product Image"
        />
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-gray-800 text-sm sm:text-base md:text-lg">
          {product.title}
        </h3>
        <h3 className="text-base sm:text-lg font-medium text-black mt-1 sm:mt-2">
          ₹{product.price}
        </h3>
      </div>
    </div>
  );
};

export default HomeSectionCard;
