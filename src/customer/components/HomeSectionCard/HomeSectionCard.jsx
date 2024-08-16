import React from "react";

const HomeSectionCard = ({product}) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover w-full h-full"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {product.title}
        </h3>
      </div>
    </div>
  );
};

export default HomeSectionCard;
